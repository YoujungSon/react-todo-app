import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// function ToDoList() {
//   const [toDo, setToDo] = useState('');
//   const [toDoError, setToDoError] = useState('');

//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDoError('');
//     setToDo(value);
//   };

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoError('To Do should be longer');
//     }
//     console.log('submit');
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder='write a to do' />
//         <button>Add</button>
//         {toDoError !== '' ? toDoError : null}
//       </form>
//     </div>
//   );
// }
interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  password1: string;
  extraError?: string;
}
function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: '@naver.com',
    },
  });
  const onVaild = (data: IForm) => {
    if (data.password !== data.password1) {
      setError('password1', { message: 'Password are not the same' });
    }
  };
  console.log(errors);
  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onVaild)}>
        <input
          {...register('email', {
            required: 'Email required',
            pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: 'Only naver.com emails allowed' },
          })}
          placeholder='Email'
        />
        <input {...register('firstName', { required: 'firstName required' })} placeholder='First Name' />
        <input {...register('lastName', { required: 'lastName required' })} placeholder='Last Name' />
        <input
          {...register('userName', {
            required: 'userName required',
            validate: {
              noNico: (value) => (value.includes('nico') ? 'No Nice allowed' : true),
              noNick: (value) => (value.includes('nick') ? 'No Nick allowed' : true),
            },
            minLength: { value: 10, message: 'Your userName too short' },
          })}
          placeholder='UserName'
        />
        <input
          {...register('password', {
            required: 'password required',
            minLength: { value: 5, message: 'Your password too short' },
          })}
          placeholder='Password'
        />
        <input
          {...register('password1', {
            required: 'Password1 is required',
            minLength: { value: 5, message: 'Your Password1 too short' },
          })}
          placeholder='Password1'
        />
        <span>
          {(errors?.email?.message as string) ||
            (errors?.firstName?.message as string) ||
            (errors?.lastName?.message as string) ||
            (errors?.userName?.message as string) ||
            (errors?.password?.message as string) ||
            (errors?.password1?.message as string) ||
            errors?.extraError?.message}
        </span>
        <button>Add</button>
      </form>
    </div>
  );
}
export default ToDoList;
