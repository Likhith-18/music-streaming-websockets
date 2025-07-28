FROM python:3.12-slim

WORKDIR /app

# Install uv globally
RUN pip install --upgrade pip && pip install uv

# Copy requirements (or pyproject.toml/uv.lock if using modern dependency management)
COPY requirements.txt .

# Always create the venv first (this line wipes the old .venv, so must be before installs)
RUN uv venv .venv

# Install dependencies INTO the current .venv
RUN uv pip install -r requirements.txt

COPY . .

EXPOSE 8000 8000

ENV PATH="/app/.venv/bin:$PATH"

CMD ["python", "main.py"]