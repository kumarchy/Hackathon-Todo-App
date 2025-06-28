import React from 'react'
import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const TaskPage = () => {
    useEffect(() => {
    socket.on('connect', () => {
    console.log('✅ Connected to socket:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('❌ Disconnected from socket');
  });

  socket.on('task_created', (task) => {
    console.log('🆕 Task created:', task);
  });

  socket.on('task_updated', (task) => {
    console.log('✏️ Task updated:', task);
  });

  socket.on('task_deleted', ({ id }) => {
    console.log('❌ Task deleted:', id);
  });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('task_created');
      socket.off('task_updated');
      socket.off('task_deleted');
    };
  }, []);

  return (
    <div>TaskPage</div>
  )
}

export default TaskPage;