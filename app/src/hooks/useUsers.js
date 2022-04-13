import { useMemo } from 'react';


export const useSortedUser = (users, sort) => {
    const sortedUsers = useMemo( () => {
        console.log('ОТРАБОТАЛА ФУНКЦИЯ СОРТЕД ЮЗЕР')
        if (sort)  {
          return [...users].sort((a, b) => a[sort].localeCompare(b[sort]));
        }
        return users;
      }, [sort, users])

      return sortedUsers;
}

export const useUsers = (users, sort, query) => {
    const sortedUsers = useSortedUser(users, sort);
    const arr =[];
    const sortedAndSearchUsers = useMemo( () => {
      for(let i=0; i<query.length; i++) {
        for (let j=0; j< sortedUsers.length; j++) {
          if (sortedUsers[j].role_id == query[i].id) {
            arr.push(sortedUsers[j])
            console.log(arr)
          }
        }
      }
      return arr;
        
      }, [query, sortedUsers])
      
    return sortedAndSearchUsers;
}