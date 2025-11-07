import json
from datetime import date
import os

FILE_NAME = "posts.json"

def load_posts():
    """Загружает список постов или создаёт пустой массив."""
    if not os.path.exists(FILE_NAME):
        return []
    try:
        with open(FILE_NAME, "r", encoding="utf-8") as f:
            content = f.read().strip()
            if not content:
                return []
            data = json.loads(content)
            # Если структура {"posts": [...]}, конвертируем в просто [...]
            if isinstance(data, dict) and "posts" in data:
                return data["posts"]
            return data if isinstance(data, list) else []
    except json.JSONDecodeError:
        print("⚠️ Некорректный JSON — создаю новый.")
        return []

def save_posts(posts):
    """Сохраняет список постов в JSON как массив."""
    with open(FILE_NAME, "w", encoding="utf-8") as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

def add_post():
    posts = load_posts()

    title = input("Введите заголовок поста: ").strip()
    print("Введите текст поста (пустая строка — завершить ввод):")
    lines = []
    while True:
        line = input()
        if not line.strip():
            break
        lines.append(line)
    text = "\n".join(lines)

    new_post = {
        "title": title,
        "text": text,
        "date": str(date.today())
    }
    posts.append(new_post)

    save_posts(posts)
    print(f"\n✅ Пост «{title}» добавлен в {FILE_NAME}")

if __name__ == "__main__":
    add_post()
