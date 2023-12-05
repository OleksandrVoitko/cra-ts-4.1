// import { Component } from 'react';
import { Li } from './ContactList.styled';

// export class ContactList extends Component {
//   componentDidUpdate() {
//     console.log(`CList did Up`);
//   }
//   render() {
//     return (
//       <>
//         <ul>
//           {this.props.contacts.map(contact => (
//             <Li key={contact.id}>
//               <p>
//                 {contact.name}: {contact.number}
//               </p>
//               <button
//                 type="button"
//                 className="btn btn-danger"
//                 onClick={() => this.props.handleDeleteContact(contact.id)}
//               >
//                 Delete
//               </button>
//             </Li>
//           ))}
//         </ul>
//       </>
//     );
//   }
// }

export function ContactList({ contacts, handleDeleteContact }) {
  return (
    <>
      <ul>
        {contacts.map(contact => (
          <Li key={contact.id}>
            <p>
              {contact.name}: {contact.number}
            </p>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDeleteContact(contact.id)}
            >
              Delete
            </button>
          </Li>
        ))}
      </ul>
    </>
  );
}
