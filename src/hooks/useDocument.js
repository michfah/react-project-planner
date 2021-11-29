import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";


export const useDocument = (collection, id) => {

    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    // realtime data for document
    useEffect(() => {
        const ref = projectFirestore.collection(collection).doc(id);

        const unsubscribe = ref.onSnapshot((snapshot) => {
            // get data inside snapshot
            if (snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id });
                setError(null);
            }
            else {
                setError('No project found');
            }
        }, (err) => {
            setError('Failed to get document');
        })

        // cleanup function
        return () => unsubscribe();

    }, [collection, id]);

    return { document, error }
}
