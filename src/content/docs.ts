import type { Locale } from "@/dictionaries";

export type DocsContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  nav: string[];
  start: { title: string; body: string; steps: { title: string; body: string }[] };
  install: { title: string; body: string; code: string; note: string };
  options: { title: string; body: string; rows: { name: string; type: string; description: string }[]; code: string };
  security: { title: string; body: string; items: string[] };
  api: { title: string; body: string; items: { method: string; path: string; body: string }[] };
  troubleshoot: { title: string; items: { question: string; answer: string }[] };
  support: { title: string; body: string; link: string };
  copy: string;
};

const installCode = `<script src="https://vizzoro-app.web.app/sdk.js" data-key="vz_pk_..."></script>
<script>
  Vizzoro.start({
    category: "floor",
    productId: "PRODUCT_ID",
    locale: "en"
  });
</script>`;

const optionsCode = `Vizzoro.start({
  category: "floor",
  productId: "PRODUCT_ID",
  locale: "pt",
  onLeadCapture: ({ productId, jobId }) => {
    console.log("Visualization completed", productId, jobId);
  }
});`;

export const docs: Record<Locale, DocsContent> = {
  en: {
    eyebrow: "Developer help center",
    title: "Bring Vizzoro into your website.",
    subtitle: "Everything an implementer needs to connect an authorized catalog, open the visualizer and understand the production flow.",
    nav: ["Start here", "Install", "SDK", "Security", "API", "Troubleshooting"],
    start: {
      title: "Start here",
      body: "Vizzoro lets shoppers place a real material from your catalog into a photo of their room. Your team manages products in the Vizzoro app. Your website loads the visualizer through a small JavaScript SDK.",
      steps: [
        { title: "1. Prepare the catalog", body: "Create a textured floor product with its image and physical dimensions in the Vizzoro app." },
        { title: "2. Authorize your website", body: "Add the exact website hostname in Integration, then create a publishable key for that domain." },
        { title: "3. Add the SDK", body: "Add the script tag and call Vizzoro.start from your product page or button." },
      ],
    },
    install: { title: "Install the SDK", body: "Place this code once on the page where shoppers can open the visualizer. The publishable key is designed for browser use.", code: installCode, note: "Replace PRODUCT_ID with the product document ID shown in your Vizzoro catalog. Use the same domain that you authorized in the app." },
    options: {
      title: "SDK reference", body: "Vizzoro.start opens an accessible full-screen visualizer. Calling it again replaces the current visualizer.", code: optionsCode,
      rows: [
        { name: "category", type: "required", description: "Material category. The current MVP supports floor." },
        { name: "productId", type: "required", description: "ID of a product in the authorized catalog." },
        { name: "locale", type: "optional", description: "en, pt or es. When omitted, Vizzoro uses the shopper browser language." },
        { name: "onLeadCapture", type: "optional", description: "Callback after a completed visualization. Receives productId and jobId." },
      ],
    },
    security: { title: "Keys and authorized domains", body: "A Vizzoro publishable key is safe to place in browser code because it has a narrow purpose. It can read one requested product and create a visualization only from a domain you approved.", items: ["Create keys in the app only after adding every production and staging hostname.", "The Cloud Run API checks the key hash and the browser Origin header on every request.", "Do not put Firebase credentials, service-account files or unpublished keys in a website.", "Create a new key and remove the old one if a domain changes ownership." ] },
    api: { title: "Public API flow", body: "The SDK calls the public API from the authorized website. Most integrations should use the SDK. These endpoints explain the behavior for advanced implementations.", items: [ { method: "GET", path: "/v1/products/{productId}", body: "Reads the public metadata for one product. Send X-Vizzoro-Key." }, { method: "POST", path: "/v1/render-jobs", body: "Sends product_id and a room photo as multipart form data. Returns the completed render and a temporary image URL." } ] },
    troubleshoot: { title: "Troubleshooting", items: [ { question: "The visualizer does not open", answer: "Confirm that the SDK script loads without a browser error and that Vizzoro.start receives a productId." }, { question: "The domain is not authorized", answer: "Add the exact hostname in Integration. Add both example.com and www.example.com when your website uses both." }, { question: "The product cannot be loaded", answer: "Confirm the product ID belongs to the same Vizzoro organization as the publishable key." }, { question: "A render failed", answer: "Use a regular JPG or PNG room photo under 25 MB. Confirm that the product has a texture and dimensions." } ] },
    support: { title: "Need implementation help?", body: "Send the page URL, browser error, product ID and the hostname you authorized. That lets our team reproduce the integration quickly.", link: "Contact Vizzoro support" },
    copy: "Copy",
  },
  "pt-BR": {
    eyebrow: "Central de ajuda para desenvolvedores",
    title: "Leve a Vizzoro para seu website.",
    subtitle: "Tudo que um implementador precisa para conectar um catálogo autorizado, abrir o visualizador e entender o fluxo de produção.",
    nav: ["Comece aqui", "Instalação", "SDK", "Segurança", "API", "Soluções"],
    start: { title: "Comece aqui", body: "A Vizzoro permite que clientes coloquem um material real do seu catálogo na foto do próprio ambiente. Sua equipe gerencia os produtos no app Vizzoro. Seu website carrega o visualizador por um pequeno SDK JavaScript.", steps: [ { title: "1. Prepare o catálogo", body: "Crie um produto de piso texturizado com imagem e dimensões físicas no app Vizzoro." }, { title: "2. Autorize seu website", body: "Adicione o hostname exato em Integração e crie uma chave pública para esse domínio." }, { title: "3. Adicione o SDK", body: "Adicione o script e chame Vizzoro.start na página ou botão do produto." } ] },
    install: { title: "Instale o SDK", body: "Adicione este código uma vez na página em que o cliente poderá abrir o visualizador. A chave pública foi criada para uso no navegador.", code: installCode.replace('locale: "en"', 'locale: "pt"'), note: "Substitua PRODUCT_ID pelo ID do documento do produto no catálogo Vizzoro. Use o mesmo domínio que foi autorizado no app." },
    options: { title: "Referência do SDK", body: "Vizzoro.start abre um visualizador acessível em tela cheia. Uma nova chamada substitui o visualizador atual.", code: optionsCode, rows: [ { name: "category", type: "obrigatório", description: "Categoria do material. O MVP atual suporta floor." }, { name: "productId", type: "obrigatório", description: "ID de um produto no catálogo autorizado." }, { name: "locale", type: "opcional", description: "en, pt ou es. Sem esse campo, a Vizzoro usa o idioma do navegador." }, { name: "onLeadCapture", type: "opcional", description: "Callback após uma visualização concluída. Recebe productId e jobId." } ] },
    security: { title: "Chaves e domínios autorizados", body: "Uma chave pública Vizzoro pode ficar no código do navegador porque tem uma finalidade limitada. Ela lê somente o produto solicitado e cria visualizações apenas em um domínio aprovado.", items: ["Crie chaves somente depois de adicionar todos os hostnames de produção e homologação.", "A API do Cloud Run valida o hash da chave e o header Origin do navegador em cada requisição.", "Nunca coloque credenciais Firebase, arquivos de conta de serviço ou chaves não publicáveis no website.", "Crie uma chave nova e remova a anterior quando um domínio mudar de proprietário."] },
    api: { title: "Fluxo da API pública", body: "O SDK chama a API pública diretamente do website autorizado. A maioria das integrações deve usar o SDK. Estes endpoints explicam o comportamento em implementações avançadas.", items: [ { method: "GET", path: "/v1/products/{productId}", body: "Lê os metadados públicos de um produto. Envie X-Vizzoro-Key." }, { method: "POST", path: "/v1/render-jobs", body: "Envia product_id e uma foto do ambiente como multipart. Retorna o render concluído e uma URL temporária." } ] },
    troubleshoot: { title: "Solução de problemas", items: [ { question: "O visualizador não abre", answer: "Confirme que o script SDK carregou sem erro no navegador e que Vizzoro.start recebeu um productId." }, { question: "O domínio não foi autorizado", answer: "Adicione o hostname exato em Integração. Inclua example.com e www.example.com se seu website usar os dois." }, { question: "O produto não carrega", answer: "Confirme que o ID do produto pertence à mesma organização Vizzoro da chave pública." }, { question: "A renderização falhou", answer: "Use uma foto JPG ou PNG comum, com até 25 MB. Confirme que o produto tem textura e dimensões." } ] },
    support: { title: "Precisa de ajuda na implementação?", body: "Envie a URL da página, o erro do navegador, o ID do produto e o hostname autorizado. Assim nosso time consegue reproduzir a integração rapidamente.", link: "Falar com o suporte Vizzoro" },
    copy: "Copiar",
  },
  es: {
    eyebrow: "Centro de ayuda para desarrolladores",
    title: "Lleva Vizzoro a tu sitio web.",
    subtitle: "Todo lo que un implementador necesita para conectar un catálogo autorizado, abrir el visualizador y entender el flujo de producción.",
    nav: ["Comienza aquí", "Instalación", "SDK", "Seguridad", "API", "Soluciones"],
    start: { title: "Comienza aquí", body: "Vizzoro permite que los clientes coloquen un material real de tu catálogo en la foto de su espacio. Tu equipo gestiona productos en la app Vizzoro. Tu sitio carga el visualizador con un pequeño SDK de JavaScript.", steps: [ { title: "1. Prepara el catálogo", body: "Crea un producto de suelo con textura, imagen y dimensiones físicas en la app Vizzoro." }, { title: "2. Autoriza tu sitio", body: "Añade el hostname exacto en Integración y crea una clave pública para ese dominio." }, { title: "3. Añade el SDK", body: "Añade el script y llama a Vizzoro.start desde la página o el botón del producto." } ] },
    install: { title: "Instala el SDK", body: "Añade este código una vez en la página donde el cliente puede abrir el visualizador. La clave pública está diseñada para usarse en el navegador.", code: installCode.replace('locale: "en"', 'locale: "es"'), note: "Sustituye PRODUCT_ID por el ID del documento de producto en el catálogo Vizzoro. Usa el mismo dominio autorizado en la app." },
    options: { title: "Referencia del SDK", body: "Vizzoro.start abre un visualizador accesible a pantalla completa. Una llamada nueva reemplaza el visualizador actual.", code: optionsCode, rows: [ { name: "category", type: "obligatorio", description: "Categoría del material. El MVP actual admite floor." }, { name: "productId", type: "obligatorio", description: "ID de un producto en el catálogo autorizado." }, { name: "locale", type: "opcional", description: "en, pt o es. Si se omite, Vizzoro usa el idioma del navegador." }, { name: "onLeadCapture", type: "opcional", description: "Callback tras una visualización completada. Recibe productId y jobId." } ] },
    security: { title: "Claves y dominios autorizados", body: "Una clave pública de Vizzoro puede estar en el código del navegador porque tiene una finalidad limitada. Solo lee el producto solicitado y crea visualizaciones desde un dominio aprobado.", items: ["Crea claves solo después de añadir todos los hostnames de producción y pruebas.", "La API de Cloud Run valida el hash de la clave y el header Origin del navegador en cada solicitud.", "Nunca coloques credenciales de Firebase, archivos de cuenta de servicio o claves no publicables en un sitio web.", "Crea una clave nueva y elimina la anterior si un dominio cambia de propietario."] },
    api: { title: "Flujo de API pública", body: "El SDK llama a la API pública directamente desde el sitio autorizado. La mayoría de integraciones debe usar el SDK. Estos endpoints explican el comportamiento avanzado.", items: [ { method: "GET", path: "/v1/products/{productId}", body: "Lee metadatos públicos de un producto. Envía X-Vizzoro-Key." }, { method: "POST", path: "/v1/render-jobs", body: "Envía product_id y una foto como formulario multipart. Devuelve el render completado y una URL temporal." } ] },
    troubleshoot: { title: "Solución de problemas", items: [ { question: "El visualizador no abre", answer: "Confirma que el script SDK se carga sin error y que Vizzoro.start recibe un productId." }, { question: "El dominio no está autorizado", answer: "Añade el hostname exacto en Integración. Incluye example.com y www.example.com si tu sitio utiliza ambos." }, { question: "El producto no carga", answer: "Confirma que el ID pertenece a la misma organización Vizzoro que la clave pública." }, { question: "El render falló", answer: "Usa una foto JPG o PNG normal de hasta 25 MB. Confirma que el producto tiene textura y dimensiones." } ] },
    support: { title: "¿Necesitas ayuda de implementación?", body: "Envía la URL de la página, el error del navegador, el ID del producto y el hostname autorizado. Así nuestro equipo puede reproducir la integración rápidamente.", link: "Contactar soporte Vizzoro" },
    copy: "Copiar",
  },
};
