import React from 'react';
import { useFirestoreDocData, useFirestore } from 'reactfire';

export function Collections() {
    // lazy load the Firestore SDK and create a document reference
    const burritoRef = useFirestore()
      .collection('tryreactfire')
      .doc('burrito');
  
    // subscribe to the doc. just one line!
    const burrito = useFirestoreDocData(burritoRef);
  
    // get the value from the doc
    const isYummy = burrito.yummy;
  
    return <p>The burrito is {isYummy ? 'good' : 'bad'}</p>;
  }