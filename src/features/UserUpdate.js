import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './userSplice';

function UserUpdate() {

    const dispatch = useDispatch()

    useEffect(() => {
        (
          async () => {
            const response = await fetch('api/user', {
              headers: {'Content-Type': 'application/json'},
              credentials: 'include',
            });
    
            const content = await response.json();
            console.log(content)
            if (content.message !== "Not authenticatedd") {
              dispatch(login({
                pseudo: content.pseudo,
                date: content.date
              }))
            }
          }
        )();
      });
}

export default UserUpdate