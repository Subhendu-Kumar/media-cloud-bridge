
# Media cloud bridge

Media-Cloud-Bridge API allows seamless uploading and management of media files (images, videos, etc.) to cloud storage services like Cloudinary. It validates file formats, uploads them to the cloud, and returns secure URLs and public IDs for easy access. The API supports multiple file types and handles errors gracefully, making it ideal for apps needing efficient media management.
## API Reference

### Upload Image

```http
  POST /upload/image
```
##### Request Body
| Key | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `image` | `file` | **Required** |

### Upload Video

```http
  POST /upload/video
```
##### Request Body
| Key | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `video` | `file` | **Required** |

## Installation

Clone the Repository Then use

```bash
  npm install
  npm run dev
```
    
## Authors

- [@Subhendu_Kumar](https://github.com/Subhendu-Kumar)

