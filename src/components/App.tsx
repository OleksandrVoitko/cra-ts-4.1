import { useEffect, useState, ChangeEvent } from "react";
import { Wrapper } from "./App.styled";
import { ContactForm } from "./ContactForm/ContactForm";
import { nanoid } from "nanoid";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import phoneNumbers from "../data/phoneNumbers.json";
import { DellAlert } from "./DellAlert/DellAlert";

export interface Contact {
  id: string;
  name: string;
  number: string;
}

export const App = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [deleted, setDeleted] = useState<boolean>(false);
  const [delName, setDelName] = useState<string>("");

  useEffect(() => {
    const localContacts = localStorage.getItem("contacts");

    if (localContacts) {
      setContacts(JSON.parse(localContacts));
    } else {
      setContacts(phoneNumbers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = ({ target }: ChangeEvent) => {
    setFilter((target as HTMLInputElement).value);
  };

  const handleSubmit = (name: string, number: string) => {
    if (
      contacts.find(
        (contact) =>
          contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert(`${name} is already in contacts!`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts([...contacts, newContact]);
  };

  const getFilteredContacts = () =>
    contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );

  const handleDeleteContact = (id: string) => {
    if (contacts.length !== 1) {
      setContacts(contacts.filter((contact) => contact.id !== id));
    } else {
      setContacts([]);
    }
    let findContact: Contact | any = contacts.find(
      (contact) => contact.id === id
    );

    setDelName(findContact.name);
    setDeleted(true);
    setTimeout(() => {
      setDeleted(false);
      setDelName("");
    }, 2000);
  };
  return (
    <Wrapper>
      <h1>PhoneBook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleChange} />
      {deleted && <DellAlert>{delName}</DellAlert>}
      <ContactList
        contacts={getFilteredContacts()}
        handleDeleteContact={handleDeleteContact}
      />
    </Wrapper>
  );
};
