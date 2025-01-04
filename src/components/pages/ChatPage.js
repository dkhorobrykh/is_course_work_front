import React, { useState, useEffect } from 'react';
import { getAllChats, sendMessageToChat, createChat } from "../../api/api";
import { Button, Input, List, Card, Layout } from 'antd';

const { Sider, Content } = Layout;

const ChatPage = () => {
    const [chats, setChats] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const [newChatUserId, setNewChatUserId] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [selectedChatMessages, setSelectedChatMessages] = useState([]);

    useEffect(() => {
        fetchChats();

        const interval = setInterval(() => {
            fetchChats();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const fetchChats = async () => {
        try {
            const chatsData = await getAllChats(setError, setSuccess);

            if (JSON.stringify(chats) !== JSON.stringify(chatsData)) {
                setChats(chatsData);
                if (!selectedChatId && chatsData.length > 0) {
                    setSelectedChatId(chatsData[0].id);
                    setSelectedChatMessages(chatsData[0].messages || []);
                } else {
                    const updatedChat = chatsData.find(chat => chat.id === selectedChatId);
                    setSelectedChatMessages(updatedChat?.messages || []);
                }
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    };

    const handleSendMessage = async () => {
        if (messageContent.trim() && selectedChatId) {
            const messageData = { text: messageContent };
            try {
                await sendMessageToChat(selectedChatId, messageData, setError, setSuccess);
                setMessageContent('');
                fetchChats();
            } catch (error) {
                setError({ message: 'Error sending message' });
            }
        } else {
            setError({ message: 'Message cannot be empty' });
        }
    };

    const handleCreateChat = async () => {
        const parsedUserId = parseInt(newChatUserId, 10);
        if (isNaN(parsedUserId)) {
            setError({ message: "User ID must be a valid number" });
            return;
        }
        try {
            await createChat(parsedUserId, setError, setSuccess);
            setNewChatUserId('');
            fetchChats();
        } catch (error) {
            setError({ message: 'Error creating chat' });
        }
    };

    const handleSelectChat = (chatId) => {
        setSelectedChatId(chatId);
        const selectedChat = chats.find(chat => chat.id === chatId);
        setSelectedChatMessages(selectedChat?.messages || []);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                width={300}
                style={{
                    background: 'linear-gradient(to bottom, #e0f7fa, #b3e5fc)',
                    padding: '20px',
                }}
            >
                <h2 style={{ color: '#007BFF', textAlign: 'center' }}>Chats</h2>
                <List
                    dataSource={chats}
                    renderItem={(chat) => (
                        <List.Item>
                            <Card
                                title={`${chat.userFirst.firstName} & ${chat.userSecond.firstName}`}
                                onClick={() => handleSelectChat(chat.id)}
                                style={{
                                    border: chat.id === selectedChatId ? '2px solid #007BFF' : '1px solid gray',
                                    cursor: 'pointer',
                                    height: '120px',
                                    width: '250px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '10px',
                                    backgroundColor: '#fff',
                                }}
                            >
                                <p
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        maxWidth: '90%',
                                    }}
                                >
                                    {chat.messages[chat.messages.length - 1]?.text || 'No messages yet'}
                                </p>
                            </Card>
                        </List.Item>
                    )}
                />
            </Sider>

            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{ padding: 24, margin: 0 }}>
                    {selectedChatId ? (
                        <>
                            <div
                                style={{
                                    height: '400px',
                                    overflowY: 'scroll',
                                    border: '1px solid #ddd',
                                    padding: '10px',
                                }}
                            >
                                {selectedChatMessages.map((msg, index) => {
                                    const isUserFirst =
                                        msg.senderId ===
                                        chats.find((chat) => chat.id === selectedChatId)?.user_first_id;
                                    const messageStyle = {
                                        marginBottom: '10px',
                                        padding: '10px',
                                        borderRadius: '10px',
                                        maxWidth: '60%',
                                        backgroundColor: isUserFirst ? '#d0f0fd' : '#e6f7ff',
                                        alignSelf: isUserFirst ? 'flex-end' : 'flex-start',
                                        marginLeft: isUserFirst ? 'auto' : '0',
                                        border: '1px solid #a3d9ff',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    };

                                    return (
                                        <div key={index} style={messageStyle}>
                                            {msg.text}
                                        </div>
                                    );
                                })}
                            </div>

                            <div style={{ marginTop: '20px' }}>
                                <Input.TextArea
                                    value={messageContent}
                                    onChange={(e) => setMessageContent(e.target.value)}
                                    placeholder="Type your message"
                                    rows={4}
                                />
                                <Button
                                    onClick={handleSendMessage}
                                    type="primary"
                                    style={{ marginTop: '10px' }}
                                >
                                    Send
                                </Button>
                            </div>
                        </>
                    ) : (
                        <p>Select a chat to start messaging.</p>
                    )}

                    <div style={{ marginTop: '30px' }}>
                        <h3>Create New Chat</h3>
                        <Input
                            placeholder="Enter user ID to start a chat"
                            value={newChatUserId}
                            onChange={(e) => setNewChatUserId(e.target.value)}
                        />
                        <Button
                            onClick={handleCreateChat}
                            type="primary"
                            style={{ marginTop: '10px' }}
                        >
                            Create Chat
                        </Button>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default ChatPage;
