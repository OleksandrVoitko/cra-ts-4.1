import { FC } from "react";
import { Li } from "./ContactList.styled";
import { Contact } from "../App";

interface ContactListProps {
  contacts: Contact[];
  handleDeleteContact: (id: string) => void;
}

export const ContactList: FC<ContactListProps> = ({
  contacts,
  handleDeleteContact,
}) => {
  return (
    <>
      <ul>
        {contacts.map((contact) => (
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
};
