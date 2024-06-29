export function createErrorMessage(error) {
  if (error.response) {
    console.error("Ошибка ответа сервера:", error.response.data);
    return "Ошибка ответа сервера: " + error.response.data.detail;
  } else if (error.request) {
    console.error("Запрос сделан, но ответа не получено:", error.request);
    return "Нет ответа от сервера";
  }
  console.error("Ошибка настройки запроса:", error.message);
  return "Ошибка настройки запроса: " + error.message;
}
