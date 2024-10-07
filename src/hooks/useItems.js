import { useState, useEffect } from 'react'
import axios from "axios";

const useItems = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function getItems() {
          const itemList = await axios('/users');
          const JSONobject = [];
          for(let i in itemList.data) {
              JSONobject.push(itemList.data[i]);
          }
          setItems(JSONobject);
          setIsLoading(false);
        }
        getItems();
      }, []);
    return [items, setItems, isLoading, setIsLoading];
}

export default useItems