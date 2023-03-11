# Динамическое создание виджета расписания

## Парсинг страницы с расписанием для учеников платформы онлайн-образования

- На странице размещён виджет "Расписание", где отображается список актуальных событий (до действия скрипта он пустой)
- В консоль выводится результат действия скрипта: я реализовал преобразование всех доступных данных (что за модуль, кто преподаватель, дата и время события, ссылка на него и тд)
- Парсится страница расписания (для примера в файле "test-html" уже размещен HTML-код необходимой страницы (в реальном режиме это происходит через async запрос))
- Для каждой даты создаётся отдельный элемент
- Если дата уже есть (например, 2 события в разное время в одну и ту же дату), добавляем в дату событие
