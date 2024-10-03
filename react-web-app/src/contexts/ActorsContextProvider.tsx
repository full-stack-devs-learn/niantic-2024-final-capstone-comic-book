import React, { useState, useEffect, useMemo } from 'react';
import { ActorsContext, ActorsContextType } from './ActorsContext';
import { Actor } from '../models/security/authentication';
import actorService from '../services/authentication-service';
import { useLocation } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

export default function ActorsContextProvider({ children }: Props) {
    const [actors, setActors] = useState<Actor[]>([]);
    const [page, setPage] = useState<number>(1);
    const [prevPage, setPrevPage] = useState<number>(0);
    const [nextPage, setNextPage] = useState<number>(2);

    const location = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  
    // Example Query Parameters


    useEffect(() => { 
        const page = +(searchParams.get('page') || '1');
        setPage(page)
        setPrevPage(page - 1)
        setNextPage(page + 1)
        fetchActors()
    }, [page]);


    // Fetch actors from the API
    async function fetchActors() {
        try 
        {
            const actors = await actorService.getActors(page)
            setActors(actors)
        } catch (error) {
            console.error('Error getting actors:', error);
        }
    }

    // Add a new actor
    async function addActor(actor: Actor) {
        try {
            const newActor = await actorService.addActor(actor)
            
            setActors(prevActors => [...prevActors, newActor]);
        } catch (error) {
            console.error('Error adding actor:', error);
        }
    };

    // Update an existing actor
    async function updateActor(actor: Actor) {
        try {
            await actorService.updateActor(actor)
            setActors(prevActors =>
                prevActors.map(a => (a.actorId === actor.actorId ? actor : a))
            );
        } catch (error) {
            console.error('Error updating actor:', error);
        }
    };

    // Delete an actor
    async function deleteActor(actorId: number) {
        try {
            await actorService.deleteActor(actorId)
            
            setActors(prevActors => prevActors.filter(actor => actor.actorId !== actorId));
        } catch (error) {
            console.error('Error deleting actor:', error);
        }
    };

    // Refresh actors from the backend
    async function refreshActors() {
        
        await fetchActors() 
    };

    function setPageNumber(page: number)
    {
        setPage(page)
        setPrevPage(page - 1)
        setNextPage(page + 1)
    }

    const contextValue: ActorsContextType = {
        actors,
        page,
        prevPage,
        nextPage,
        setPageNumber,
        addActor,
        updateActor,
        deleteActor,
        refreshActors,
    };

    return <ActorsContext.Provider value={contextValue}>{children}</ActorsContext.Provider>;
};
