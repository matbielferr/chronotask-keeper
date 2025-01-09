import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "taskOrganizer": "Task Organizer",
      "addNewTask": "Add New Task",
      "noTasks": "No tasks yet. Add your first task to get started!",
      "taskTitle": "Task title",
      "taskDescription": "Task description (optional)",
      "priority": "Priority",
      "low": "Low",
      "medium": "Medium",
      "high": "High",
      "deadline": "Deadline",
      "tags": "Tags (comma-separated)",
      "tagsPlaceholder": "e.g., work, personal, urgent",
      "start": "Start",
      "stop": "Stop",
      "startedAt": "Started at",
      "taskAdded": "Task added successfully",
      "trackingStarted": "Time tracking started",
      "trackingStopped": "Time tracking stopped"
    }
  },
  pt: {
    translation: {
      "taskOrganizer": "Organizador de Tarefas",
      "addNewTask": "Adicionar Nova Tarefa",
      "noTasks": "Nenhuma tarefa ainda. Adicione sua primeira tarefa para começar!",
      "taskTitle": "Título da tarefa",
      "taskDescription": "Descrição da tarefa (opcional)",
      "priority": "Prioridade",
      "low": "Baixa",
      "medium": "Média",
      "high": "Alta",
      "deadline": "Prazo",
      "tags": "Tags (separadas por vírgula)",
      "tagsPlaceholder": "ex: trabalho, pessoal, urgente",
      "start": "Iniciar",
      "stop": "Parar",
      "startedAt": "Iniciado em",
      "taskAdded": "Tarefa adicionada com sucesso",
      "trackingStarted": "Contagem de tempo iniciada",
      "trackingStopped": "Contagem de tempo parada"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;