import React, { useState, useEffect } from "react";
import "../MessageDashboard/MessageDashboard.css";
import axios from "axios";
import SearchBar from "../SearchBar/searchBar";
import MessageModal from "../Modals/MessageModal/MessageModal";


const MessagingDashboard = () => {
  const [messages, setMessages] = useState([
    {
      MessageSid: "1",
      SmsSid: "1",
      AccountSid: "1",
      MessagingServiceSid: "1",
      From: "Jane Peters",
      To: "16501231234",
      Body: "Insulin 80mg MWF",
      timeStamp: "2024-03-30T10:00:00",
    },
    {
      MessageSid: "2",
      SmsSid: "2",
      AccountSid: "2",
      MessagingServiceSid: "2",
      From: "Jeff Goldberg",
      To: "16501235678",
      Body: "Amoxicillin 40mg TTh",
      timeStamp: "2024-03-30T11:00:00",
    },
    {
      MessageSid: "3",
      SmsSid: "3",
      AccountSid: "3",
      MessagingServiceSid: "3",
      From: "Max Fischer",
      To: "14082546781",
      Body: "Ibuprofen 400mg MF",
      timeStamp: "2024-03-30T12:00:00",
    },
    
    // Add more messages here...
  ]);

  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [totalMessages, setTotalMessages] = useState(messages.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage, setMessagesPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [modalContent, setModalContent] = useState(false);
  const [choosenUser, setChoosenUser] = useState(null);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMessages / messagesPerPage); i++) {
    pageNumbers.push(i);
  }

  const fetchMessages = () => {
    // Logic to fetch messages
    // For example, setDisplayedMessages(messages.slice(0, messagesPerPage));
  };

  const openModal = (index) => {
    setModalContent(true);
    setChoosenUser(index);
  };

  const closeModal = () => {
    setModalContent(false);
    fetchMessages();
  };

  const handleDelete = (index) => {
    // Logic to delete a message
  };

  const handleSearchMessages = (event) => {
    // Logic to search messages
  };

  useEffect(() => {
    fetchMessages();
  }, [currentPage]);

  useEffect(() => {
    // Update displayed messages when messages change
    setDisplayedMessages(messages.slice((currentPage - 1) * messagesPerPage, currentPage * messagesPerPage));
  }, [messages, currentPage, messagesPerPage]);

  return (
    <div className="dashboard-container">
      <h2 className="message-header">Message Dashboard</h2>
      <div className="dashboard-top-message">
        <div className="dashboard-searchbar-container">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <button onClick={handleSearchMessages}>Search</button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th>MessageSid</th>
                <th>SmsSid</th>
                <th>AccountSid</th>
                <th>MessagingServiceSid</th>
                <th>From</th>
                <th>To</th>
                <th>Body</th>
                <th>Timestamp</th>
                <th>Delete Message</th>
                <th>Send Message</th>
              </tr>
            </thead>
            <tbody>
              {displayedMessages.map((message, index) => (
                <tr key={message.MessageSid}>
                  <td>{message.MessageSid}</td>
                  <td>{message.SmsSid}</td>
                  <td>{message.AccountSid}</td>
                  <td>{message.MessagingServiceSid}</td>
                  <td>{message.From}</td>
                  <td>{message.To}</td>
                  <td>{message.Body}</td>
                  <td>{message.timeStamp}</td>
                  <td style={{ color: "red", cursor: "pointer" }} onClick={() => handleDelete(index)}>delete message</td>
                  <td style={{ color: "green", cursor: "pointer" }} onClick={() => openModal(index)}>send message</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pagination-container">
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {modalContent && <MessageModal closeModal={closeModal} user={messages[choosenUser]} />}
    </div>
  );
};

export default MessagingDashboard;
