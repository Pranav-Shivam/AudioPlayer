# Text-to-Speech API Backend

A FastAPI-based backend service that converts text to speech using pyttsx3.

## Features

- Convert text to speech and return downloadable audio files
- Configurable speech rate, volume, and voice selection
- Support for custom filenames
- Automatic temporary file management
- Voice discovery and listing
- Proper error handling and validation

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python main.py
```

The server will start on `http://localhost:7005`

## API Endpoints

### POST /text-to-speech/
Convert text to speech and return an audio file.

**Request Body:**
```json
{
  "text": "Hello, this is a test message",
  "filename": "my_audio"  // optional
}
```

**Response:** Audio file (WAV format) with appropriate headers for download.

### GET /voices/
Get list of available voices on the system.

**Response:**
```json
{
  "voices": [
    {
      "id": "voice_id",
      "name": "Voice Name",
      "languages": ["en-US"],
      "gender": "male",
      "age": 25
    }
  ]
}
```

### GET /
Get API information and available endpoints.

## Usage Examples

### Basic text-to-speech conversion:
```bash
curl -X POST "http://localhost:7005/text-to-speech/" \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world!"}' \
  --output speech.wav
```

### With custom filename:
```bash
curl -X POST "http://localhost:7005/text-to-speech/" \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world!", "filename": "custom_audio"}' \
  --output custom_audio.wav
```

### Get available voices:
```bash
curl "http://localhost:7005/voices/"
```

## Error Handling

The API returns appropriate HTTP status codes:
- `400`: Bad Request (invalid input parameters)
- `500`: Internal Server Error (TTS engine issues)

## Notes

- Audio files are saved in WAV format
- Temporary files are automatically cleaned up
- The TTS engine is properly initialized and cleaned up for each request
- Voice selection is validated against available system voices 