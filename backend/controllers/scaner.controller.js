const tesseract = require('node-tesseract-ocr');

const extractText = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se envió ninguna imagen' });
  }

  const path = req.file.path;
  const config = {
    lang: 'spa',
    oem: 1,
    psm: 3,
  };

  tesseract.recognize(path, config)
    .then(text => {
      if (!text || text.trim().length === 0) {
        // Verificar si el texto está vacío o solo contiene espacios en blanco
        return res.status(422).json({ error: 'No se pudo extraer texto de la imagen' });
      }
      console.log('Resultado del OCR:', text);
      res.json({ text });
    })
    .catch(error => {
      console.error('Error al procesar la imagen:', error);

      // Personaliza la respuesta en función del tipo de error
      let errorMessage = 'Error al procesar la imagen';
      if (error.message.includes('tesseract is not installed')) {
        errorMessage = 'Error: Tesseract no está instalado en el servidor';
      } else if (error.message.includes('image not found')) {
        errorMessage = 'Error: La imagen no se encontró o no es accesible';
      }

      res.status(500).json({ error: errorMessage });
    });
};

module.exports = { extractText };
