import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, writeBatch, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../config/firebase.js';
import Sortable from 'sortablejs';
import { createIcons, LogOut, Clock, Map, MapPin, Plus, Trash2, GripVertical, Pencil } from 'lucide';

let globalShows = [];
let sortableInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    // Icons init
    createIcons({
        icons: { LogOut, Clock, Map, MapPin, Plus, Trash2, GripVertical, Pencil }
    });

    const logoutBtn = document.getElementById('logout-btn');
    const showForm = document.getElementById('show-form');
    const showsList = document.getElementById('shows-list');
    const showsCount = document.getElementById('shows-count');
    const emptyState = document.getElementById('empty-state');

    // Form Inputs
    const inputDate = document.getElementById('show-date');
    const inputTime = document.getElementById('show-time');
    const inputCity = document.getElementById('show-city');
    const inputVenue = document.getElementById('show-venue');
    const inputEditingId = document.getElementById('editing-id');
    const cancelBtn = document.getElementById('cancel-btn');
    const formTitle = document.getElementById('form-title');
    const submitIcon = document.getElementById('submit-icon');
    const submitText = document.getElementById('submit-text');

    const datalistCities = document.getElementById('cities-list');
    const datalistVenues = document.getElementById('venues-list');

    // 1. Auth Guard
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = './login.html';
        }
    });

    // 2. Fetch Shows Realtime
    const q = query(collection(db, 'shows'), orderBy('order', 'asc'));
    const unsubscribeShows = onSnapshot(q, (querySnapshot) => {
        globalShows = querySnapshot.docs.map(d => ({
            id: d.id,
            ...d.data()
        }));

        renderShowsList();
        updateDatalists();
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        signOut(auth);
    });

    // Handle Form Submit (Add/Edit)
    showForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const dateRaw = inputDate.value;
        const time = inputTime.value;
        const city = inputCity.value;
        const venue = inputVenue.value;
        const editingId = inputEditingId.value;

        if (!dateRaw || !city || !venue) return;

        // Formatear fecha de YYYY-MM-DD a DD/MM
        const parts = dateRaw.split('-');
        let formattedDate = dateRaw; // fallback
        if (parts.length === 3) {
            const [, month, day] = parts;
            formattedDate = `${day}/${month}`;
        }

        const showData = {
            date: formattedDate,
            rawDate: dateRaw,
            time: time,
            city: city,
            venue: venue
        };

        try {
            if (editingId) {
                // Update
                await updateDoc(doc(db, 'shows', editingId), showData);
                resetForm();
            } else {
                // Add new
                await addDoc(collection(db, 'shows'), {
                    ...showData,
                    order: globalShows.length
                });
                showForm.reset();
            }
        } catch (error) {
            console.error("Error saving document: ", error);
            alert("Error al guardar la fecha.");
        }
    });

    // Handle Cancel Edit
    cancelBtn.addEventListener('click', resetForm);

    function resetForm() {
        showForm.reset();
        inputEditingId.value = '';
        formTitle.textContent = 'Añadir nueva fecha';
        submitIcon.setAttribute('data-lucide', 'plus');
        submitText.textContent = 'Añadir';
        cancelBtn.classList.add('hidden');
        createIcons({ icons: { Plus } });
    }

    // Handlers exposed to window for inline onclick attributes injected in HTML
    window.handleEditShow = (id) => {
        const show = globalShows.find(s => s.id === id);
        if (!show) return;

        let parsedDate = show.rawDate || '';
        // Retrocompatibility if rawDate doesn't exist
        if (!parsedDate && show.date && show.date.includes('/')) {
            const [d, m] = show.date.split('/');
            parsedDate = `${new Date().getFullYear()}-${m}-${d}`;
        }

        inputDate.value = parsedDate;
        inputTime.value = show.time || '';
        inputCity.value = show.city || '';
        inputVenue.value = show.venue || '';
        inputEditingId.value = show.id;

        formTitle.textContent = 'Editar fecha publicada';
        submitIcon.setAttribute('data-lucide', 'pencil');
        submitText.textContent = 'Guardar';
        cancelBtn.classList.remove('hidden');
        createIcons({ icons: { Pencil } });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.handleDeleteShow = async (id) => {
        if (window.confirm('¿Seguro que quieres borrar esta fecha?')) {
            try {
                await deleteDoc(doc(db, 'shows', id));
            } catch (error) {
                console.error("Error deleting document: ", error);
            }
        }
    };

    function renderShowsList() {
        showsList.innerHTML = '';
        showsCount.textContent = `${globalShows.length} shows`;

        if (globalShows.length === 0) {
            emptyState.classList.remove('hidden');
            if (sortableInstance) {
                sortableInstance.destroy();
                sortableInstance = null;
            }
            return;
        }

        emptyState.classList.add('hidden');

        globalShows.forEach(show => {
            const timeTag = show.time
                ? `<span class="text-xs bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded-full font-mono">${show.time}</span>`
                : '';

            const div = document.createElement('div');
            // Adding data-id attribute for Sortable to use for the order
            div.setAttribute('data-id', show.id);
            div.className = "show-item flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-xl border bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10 transition-all gap-4";

            div.innerHTML = `
                <div class="flex gap-4 md:gap-8 w-full md:w-auto overflow-hidden items-center relative">
                    <div class="drag-handle text-white/20 hover:text-white cursor-grab active:cursor-grabbing p-2 -ml-2 rounded-lg hover:bg-brand-bg/50 transition-colors">
                        <i data-lucide="grip-vertical" class="w-5 h-5 pointer-events-none"></i>
                    </div>
                    <div class="font-headings text-lg md:text-xl text-brand-text whitespace-nowrap min-w-[80px]">
                        ${show.date}
                    </div>
                    <div class="flex flex-col">
                        <div class="flex items-center gap-2">
                            <span class="font-bold text-sm">${show.city}</span>
                            ${timeTag}
                        </div>
                        <span class="text-xs text-white/50">${show.venue}</span>
                    </div>
                </div>
                <div class="flex gap-2 ml-auto md:ml-0">
                    <button onclick="window.handleEditShow('${show.id}')" class="p-3 bg-white/10 text-white rounded-lg hover:bg-brand-accent hover:text-brand-bg transition-colors" title="Editar">
                        <i data-lucide="pencil" class="w-4 h-4 pointer-events-none"></i>
                    </button>
                    <button onclick="window.handleDeleteShow('${show.id}')" class="p-3 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors" title="Borrar">
                        <i data-lucide="trash-2" class="w-4 h-4 pointer-events-none"></i>
                    </button>
                </div>
            `;
            showsList.appendChild(div);
        });

        // Recreate icons in the newly appended HTML
        createIcons({ icons: { GripVertical, Pencil, Trash2 } });

        // Initialize or refresh SortableJS
        initSortable();
    }

    function updateDatalists() {
        datalistCities.innerHTML = '';
        datalistVenues.innerHTML = '';

        const citiesObj = {};
        const venuesObj = {};

        globalShows.forEach(s => {
            if (s.city) citiesObj[s.city] = true;
            if (s.venue) venuesObj[s.venue] = true;
        });

        Object.keys(citiesObj).forEach(city => {
            const opt = document.createElement('option');
            opt.value = city;
            datalistCities.appendChild(opt);
        });

        Object.keys(venuesObj).forEach(venue => {
            const opt = document.createElement('option');
            opt.value = venue;
            datalistVenues.appendChild(opt);
        });
    }

    function initSortable() {
        if (sortableInstance) {
            sortableInstance.destroy();
        }

        sortableInstance = new Sortable(showsList, {
            handle: '.drag-handle', // Restricted drag to the icon handle
            animation: 150,
            ghostClass: 'opacity-50', // Class for the element being dragged
            dragClass: 'bg-[#1e293b]',
            onEnd: async function (evt) {
                // Get the new order arrangement array of data-id 
                const newOrderArr = sortableInstance.toArray();

                try {
                    const batch = writeBatch(db);
                    newOrderArr.forEach((id, index) => {
                        const docRef = doc(db, 'shows', id);
                        batch.update(docRef, { order: index });
                    });

                    // UI is optimistic physically because sortable moves the DOM
                    // we just apply the batch to firebase
                    await batch.commit();
                } catch (error) {
                    console.error("Error reordering documents: ", error);
                    alert("Error guardando el nuevo orden.");
                }
            }
        });
    }
});
