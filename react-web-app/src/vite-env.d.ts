/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_PUBLIC_KEY: string;
    readonly VITE_PRIVATE_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}