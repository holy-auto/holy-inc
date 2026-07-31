const modules = import.meta.glob('./*/*.ts', { eager: true });

const messages: Record<string, { common: Record<string, string> }> = {};

Object.keys(modules).forEach((path) => {
  const match = path.match(/\.\/([^/]+)\/([^/]+)\.ts$/);
  if (match) {
    const [, lang] = match;
    const module = modules[path] as { default?: Record<string, string> };
    
    if (!messages[lang]) {
      messages[lang] = { common: {} };
    }
    
    if (module.default) {
      messages[lang].common = {
        ...messages[lang].common,
        ...module.default
      };
    }
  }
});

export default messages;