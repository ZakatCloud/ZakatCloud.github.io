import json
import os
from datetime import date

FILE_NAME = "articles.json"

def load_articles():
    """Загружает статьи или создаёт пустой список."""
    if not os.path.exists(FILE_NAME):
        return []
    try:
        with open(FILE_NAME, "r", encoding="utf-8") as f:
            content = f.read().strip()
            if not content:
                return []
            data = json.loads(content)
            return data if isinstance(data, list) else []
    except json.JSONDecodeError:
        print("⚠️ Ошибка чтения JSON. Создаю новый файл.")
        return []

def save_articles(articles):
    """Сохраняет список статей в JSON."""
    with open(FILE_NAME, "w", encoding="utf-8") as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)

def add_article():
    """Добавление новой статьи."""
    articles = load_articles()

    title = input("Введите заголовок статьи: ").strip()
    print("Введите краткое описание (несколько строк, пустая строка = конец):")
    lines = []
    while True:
        line = input()
        if not line.strip():
            break
        lines.append(line)
    description = "\n".join(lines)

    link = input("Введите ссылку на полную статью (или оставьте пустой): ").strip()
    if not link:
        link = "#"

    new_article = {
        "title": title,
        "description": description,
        "link": link,
        "date": str(date.today())
    }

    articles.append(new_article)
    save_articles(articles)
    print(f"\n✅ Статья «{title}» успешно добавлена в {FILE_NAME}!")

if __name__ == "__main__":
    add_article()
