import useSWR from 'swr';
import { fetcher } from './fetcher';

export function useContact() {
    const { data: contacts, error } = useSWR('/api/contacts', fetcher);
    return { contacts };
}

