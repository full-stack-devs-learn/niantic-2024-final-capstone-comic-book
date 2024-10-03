import React from 'react';
import { Actor } from '../models/security/authentication';

export interface ActorsContextType {
    actors: Actor[];
    page: number;
    prevPage: number;
    nextPage: number;
    setPageNumber: (page: number) => void;
    addActor: (actor: Actor) => Promise<void>;
    updateActor: (actor: Actor) => Promise<void>;
    deleteActor: (actorId: number) => Promise<void>;
    refreshActors: () => Promise<void>;
  }

export const ActorsContext = React.createContext<ActorsContextType | undefined>(undefined);