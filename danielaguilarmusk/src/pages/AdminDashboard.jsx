import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, writeBatch } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../config/firebase';
import { Trash2, Plus, LogOut, Calendar, MapPin, Map, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const AdminDashboard = () => {
    const [shows, setShows] = useState([]);
    const [newShow, setNewShow] = useState({ date: '', city: '', venue: '' });
    const navigate = useNavigate();

    // Check auth
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) navigate('/admin/login');
        });
        return () => unsubscribe();
    }, [navigate]);

    // Fetch shows
    useEffect(() => {
        // Query ordered by 'order' index, fallback to date if order doesn't exist
        const q = query(collection(db, 'shows'), orderBy('order', 'asc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const showsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setShows(showsData);
        });

        return () => unsubscribe();
    }, []);

    const handleAddShow = async (e) => {
        e.preventDefault();
        if (!newShow.date || !newShow.city || !newShow.venue) return;

        // Formatear fecha de YYYY-MM-DD a DD/MM
        const parts = newShow.date.split('-');
        let formattedDate = newShow.date; // fallback
        if (parts.length === 3) {
            const [, month, day] = parts;
            formattedDate = `${day}/${month}`;
        }

        try {
            // Assign new order at the end of the list
            await addDoc(collection(db, 'shows'), {
                ...newShow,
                date: formattedDate,
                order: shows.length
            });
            setNewShow({ date: '', city: '', venue: '' });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Seguro que quieres borrar esta fecha?')) {
            try {
                await deleteDoc(doc(db, 'shows', id));
            } catch (error) {
                console.error("Error deleting document: ", error);
            }
        }
    };

    const handleLogout = () => {
        signOut(auth);
    };

    const handleOnDragEnd = async (result) => {
        if (!result.destination) return; // Dropped outside the list

        const items = Array.from(shows);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Optimistic UI update
        setShows(items);

        // Update all documents with their new 'order' index in a Firebase batch
        try {
            const batch = writeBatch(db);
            items.forEach((item, index) => {
                const docRef = doc(db, 'shows', item.id);
                batch.update(docRef, { order: index });
            });
            await batch.commit();
        } catch (error) {
            console.error("Error reordering documents: ", error);
        }
    };

    return (
        <div className="min-h-screen bg-brand-bg text-brand-text p-6 md:p-12 font-sans w-full">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center bg-[#0f172a] p-6 rounded-3xl border border-white/10 shadow-2xl mb-8">
                    <div>
                        <h1 className="font-headings text-2xl md:text-3xl text-brand-text">Panel del Artista</h1>
                        <p className="font-mono text-xs text-brand-accent uppercase mt-2">Agenda // En vivo</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-white hover:text-red-400 rounded-full transition-all text-xs font-mono uppercase tracking-widest"
                    >
                        <LogOut size={14} /> Salir
                    </button>
                </div>

                {/* Formulario de agregar */}
                <div className="bg-[#0f172a] p-6 rounded-3xl border border-white/10 shadow-2xl mb-8">
                    <h2 className="font-headings text-xl mb-6">Añadir nueva fecha</h2>
                    <form onSubmit={handleAddShow} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="relative">
                            <input
                                type="date"
                                required
                                value={newShow.date}
                                onChange={(e) => setNewShow({ ...newShow, date: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-colors text-white/80"
                            />
                        </div>
                        <div className="relative">
                            <Map className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                            <input
                                type="text"
                                list="cities-list"
                                placeholder="Ciudad (ej. Madrid)"
                                required
                                value={newShow.city}
                                onChange={(e) => setNewShow({ ...newShow, city: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                            />
                            <datalist id="cities-list">
                                {[...new Set(shows.map(show => show.city))].map((city, idx) => (
                                    <option key={idx} value={city} />
                                ))}
                            </datalist>
                        </div>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                            <input
                                type="text"
                                list="venues-list"
                                placeholder="Sala / Recinto"
                                required
                                value={newShow.venue}
                                onChange={(e) => setNewShow({ ...newShow, venue: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                            />
                            <datalist id="venues-list">
                                {[...new Set(shows.map(show => show.venue))].map((venue, idx) => (
                                    <option key={idx} value={venue} />
                                ))}
                            </datalist>
                        </div>
                        <button
                            type="submit"
                            className="bg-brand-accent text-brand-bg rounded-xl font-bold uppercase tracking-widest text-xs py-3 flex items-center justify-center gap-2 hover:bg-white transition-colors"
                        >
                            <Plus size={16} /> Añadir
                        </button>
                    </form>
                </div>

                {/* Listado de Shows actuales con DND */}
                <div className="bg-[#0f172a] p-6 rounded-3xl border border-white/10 shadow-2xl">
                    <h2 className="font-headings text-xl mb-6 flex justify-between items-center">
                        Tus conciertos publicados
                        <span className="text-xs font-mono bg-white/10 px-3 py-1 rounded-full">{shows.length} shows</span>
                    </h2>

                    {shows.length === 0 ? (
                        <div className="text-center py-12 text-white/30 font-mono text-sm border border-dashed border-white/10 rounded-xl">
                            No hay fechas programadas actualmente.
                        </div>
                    ) : (
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="shows-list">
                                {(provided) => (
                                    <div
                                        className="flex flex-col gap-3"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {shows.map((show, index) => (
                                            <Draggable key={show.id} draggableId={show.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-xl border transition-all gap-4
                                                            ${snapshot.isDragging
                                                                ? 'bg-[#1e293b] border-brand-accent shadow-xl scale-[1.02] z-50'
                                                                : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10'}`}
                                                    >
                                                        <div className="flex gap-4 md:gap-8 w-full md:w-auto overflow-hidden items-center relative">
                                                            <div
                                                                {...provided.dragHandleProps}
                                                                className="text-white/20 hover:text-white cursor-grab active:cursor-grabbing p-2 -ml-2 rounded-lg hover:bg-brand-bg/50 transition-colors"
                                                            >
                                                                <GripVertical size={20} />
                                                            </div>
                                                            <div className="font-headings text-lg md:text-xl text-brand-text whitespace-nowrap min-w-[80px]">
                                                                {show.date}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-sm">{show.city}</span>
                                                                <span className="text-xs text-white/50">{show.venue}</span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleDelete(show.id)}
                                                            className="p-3 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors ml-auto md:ml-0"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
