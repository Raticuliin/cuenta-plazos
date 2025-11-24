"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SeoContent() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 text-slate-700">
      {/* Heading principal oculto para SEO */}
      <h1 className="sr-only">
        Calculadora de Días Hábiles y Laborables en España
      </h1>

      {/* Contenido expandible */}
      <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-100 transition-colors"
        >
          <h2 className="text-lg font-semibold text-slate-800">
            ¿Cómo calcular días hábiles y laborables?
          </h2>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {expanded && (
          <div className="px-6 pb-6 space-y-4 text-sm leading-relaxed animate-in slide-in-from-top-2 fade-in duration-300">
            <p>
              <strong>CuentaPlazos</strong> es una calculadora profesional de
              días hábiles, laborables y naturales diseñada específicamente para
              España. Nuestra herramienta considera automáticamente los{" "}
              <strong>festivos oficiales</strong> de cada comunidad autónoma,
              garantizando cálculos precisos para plazos legales y procesales.
            </p>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Tipos de días en plazos legales
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong>Días Hábiles:</strong> Se excluyen fines de semana
                  (sábados y domingos) y festivos oficiales. Comúnmente usado en
                  plazos procesales y administrativos.
                </li>
                <li>
                  <strong>Días Laborables:</strong> Se excluyen solo los
                  domingos y festivos oficiales. Los sábados SÍ cuentan.
                </li>
                <li>
                  <strong>Días Naturales:</strong> Todos los días del calendario
                  cuentan, incluyendo fines de semana y festivos.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Casos de uso comunes
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong>Despidos laborales:</strong> Calcular el plazo de 20
                  días hábiles para impugnar un despido (Art. 59 ET)
                </li>
                <li>
                  <strong>Multas de tráfico:</strong> 20 días naturales para
                  presentar alegaciones o recurso
                </li>
                <li>
                  <strong>Alegaciones tributarias:</strong> Plazos de Hacienda,
                  típicamente 10 días hábiles
                </li>
                <li>
                  <strong>Juicio monitorio:</strong> 20 días hábiles para
                  presentar oposición
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                ¿Por qué usar CuentaPlazos?
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  ✅ <strong>Festivos actualizados:</strong> Base de datos
                  completa de festivos nacionales y autonómicos
                </li>
                <li>
                  ✅ <strong>Calendario visual:</strong> Ve claramente qué días
                  cuentan y cuáles se excluyen
                </li>
                <li>
                  ✅ <strong>100% gratuito:</strong> Sin registro ni límites de
                  uso
                </li>
                <li>
                  ✅ <strong>Accesos rápidos:</strong> Presets para casos
                  legales más frecuentes
                </li>
                <li>
                  ✅ <strong>Preciso y confiable:</strong> Calcula exactamente
                  según la normativa vigente
                </li>
              </ul>
            </div>

            <p className="text-xs text-slate-500 italic mt-4">
              Nota: CuentaPlazos es una herramienta de ayuda. Para decisiones
              legales importantes, consulta siempre con un profesional del
              derecho.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
