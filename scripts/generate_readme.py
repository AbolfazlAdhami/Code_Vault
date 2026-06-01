import os


# EXCLUDE = {'.git', '.github', 'scripts', '__pycache__', '.vscode'}
EXCLUDE = {'.git', '.github', 'scripts',
           '__pycache__', 'venv', '.vscode', '.idea'}


def generate_readme():
    header = "# My Code Vault: List of Projects\n\nThis is a list of all the projects in my code vault:\n\n"
    content = "There is place for all my projects, and I will keep adding more as I work on them. Feel free to explore and check out the code!\n\n"

    items = sorted([d for d in os.listdir(
        '.') if os.path.isdir(d) and d not in EXCLUDE])

    for item in items:
        content += f"- **{item.upper()}**\n"

    with open('README.md', 'w', encoding='utf-8') as f:
        f.write(header + content)


if __name__ == "__main__":
    generate_readme()
