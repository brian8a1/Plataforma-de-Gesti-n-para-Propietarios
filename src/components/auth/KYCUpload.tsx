import React, { useState } from 'react';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
export function KYCUpload() {
  const {
    submitKYC
  } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'verifying' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
    }
  };
  const handleSubmit = async () => {
    if (!file) return;
    setStatus('uploading');
    // Simulate upload delay
    setTimeout(() => {
      setStatus('verifying');
      // Simulate verification delay (OCR check)
      setTimeout(() => {
        // Random success/fail for demo purposes (mostly success)
        const success = Math.random() > 0.1;
        if (success) {
          setStatus('success');
          setTimeout(() => {
            submitKYC();
          }, 1500);
        } else {
          setStatus('error');
          setErrorMessage('No pudimos leer el documento. Asegúrate de que la foto tenga buena iluminación.');
        }
      }, 2000);
    }, 1500);
  };
  return <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
          <FileText className="h-6 w-6 text-teal-600" />
        </div>
        <h2 className="text-xl font-bold text-stone-900">
          Verifica tu residencia
        </h2>
        <p className="text-stone-600 mt-2 text-sm">
          Para mantener la seguridad de la comunidad, necesitamos verificar que
          eres residente. Sube una foto de un recibo público o extracto de
          administración.
        </p>
      </div>

      <Card className="border-2 border-dashed border-stone-300 bg-stone-50 hover:bg-stone-100 transition-colors">
        <label className="flex flex-col items-center justify-center h-48 cursor-pointer">
          <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileChange} disabled={status !== 'idle' && status !== 'error'} />

          {file ? <div className="text-center">
              <FileText className="h-10 w-10 text-teal-500 mx-auto mb-2" />
              <p className="font-medium text-stone-900">{file.name}</p>
              <p className="text-xs text-stone-500 mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <p className="text-xs text-teal-600 mt-2 font-medium">
                Clic para cambiar
              </p>
            </div> : <div className="text-center p-4">
              <Upload className="h-10 w-10 text-stone-400 mx-auto mb-2" />
              <p className="font-medium text-stone-900">Sube tu documento</p>
              <p className="text-xs text-stone-500 mt-1">
                JPG, PNG o PDF (Max 5MB)
              </p>
            </div>}
        </label>
      </Card>

      {status === 'verifying' && <motion.div initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="bg-blue-50 p-4 rounded-lg flex items-start">
          <div className="mr-3 mt-0.5">
            <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900">
              Verificando documento...
            </h4>
            <p className="text-xs text-blue-700 mt-1">
              Nuestro sistema está analizando la información automáticamente.
            </p>
          </div>
        </motion.div>}

      {status === 'success' && <motion.div initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="bg-emerald-50 p-4 rounded-lg flex items-start">
          <Check className="h-5 w-5 text-emerald-600 mr-3 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-emerald-900">
              ¡Verificación exitosa!
            </h4>
            <p className="text-xs text-emerald-700 mt-1">
              Bienvenido a la comunidad. Redirigiendo...
            </p>
          </div>
        </motion.div>}

      {status === 'error' && <motion.div initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="bg-red-50 p-4 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-red-900">
              Error en la verificación
            </h4>
            <p className="text-xs text-red-700 mt-1">{errorMessage}</p>
          </div>
        </motion.div>}

      <Button fullWidth size="lg" onClick={handleSubmit} disabled={!file || status === 'uploading' || status === 'verifying' || status === 'success'} isLoading={status === 'uploading'}>
        {status === 'idle' || status === 'error' ? 'Verificar Documento' : 'Procesando...'}
      </Button>
    </div>;
}