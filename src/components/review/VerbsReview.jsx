import { Info } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { Card } from '../ui/Card.jsx'

const PRONOUNS = {
  es: ['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos'],
  en: ['I', 'you', 'he/she', 'we', 'you (pl.)', 'they'],
  pt: ['eu', 'tu', 'ele/ela', 'nós', 'vós', 'eles'],
  fr: ['je', 'tu', 'il/elle', 'nous', 'vous', 'ils'],
  it: ['io', 'tu', 'lui/lei', 'noi', 'voi', 'loro'],
  sq: ['unë', 'ti', 'ai/ajo', 'ne', 'ju', 'ata'],
  tr: ['ben', 'sen', 'o', 'biz', 'siz', 'onlar'],
}

const VERB_TABLES = [
  {
    infinitive: { hochdeutsch: 'sein', schwiizerduetsch: 'sii' },
    meaning: { es: 'ser / estar', en: 'to be', pt: 'ser / estar', fr: 'être', it: 'essere', sq: 'me qenë', tr: 'olmak' },
    forms: {
      hochdeutsch: ['ich bin', 'du bist', 'er/sie ist', 'wir sind', 'ihr seid', 'sie sind'],
      schwiizerduetsch: ['ich bi', 'du bisch', 'er/si isch', 'mir sind', 'ihr sind', 'si sind'],
    },
  },
  {
    infinitive: { hochdeutsch: 'haben', schwiizerduetsch: 'ha' },
    meaning: { es: 'tener / haber', en: 'to have', pt: 'ter / haver', fr: 'avoir', it: 'avere', sq: 'të kesh', tr: 'sahip olmak' },
    forms: {
      hochdeutsch: ['ich habe', 'du hast', 'er/sie hat', 'wir haben', 'ihr habt', 'sie haben'],
      schwiizerduetsch: ['ich ha', 'du hesch', 'er/si hät', 'mir händ', 'ihr händ', 'si händ'],
    },
  },
  {
    infinitive: { hochdeutsch: 'machen', schwiizerduetsch: 'mache' },
    meaning: { es: 'hacer (verbo regular modelo)', en: 'to do/make (regular verb model)', pt: 'fazer (verbo regular modelo)', fr: 'faire (verbe régulier type)', it: 'fare (verbo regolare modello)', sq: 'të bësh (folje e rregullt model)', tr: 'yapmak (düzenli fiil örneği)' },
    forms: {
      hochdeutsch: ['ich mache', 'du machst', 'er/sie macht', 'wir machen', 'ihr macht', 'sie machen'],
      schwiizerduetsch: ['ich mache', 'du machsch', 'er/si macht', 'mir mached', 'ihr mached', 'si mached'],
    },
  },
]

const NOTES = [
  {
    title: {
      es: 'El truco del pasado: solo existe un tiempo',
      en: 'The past-tense trick: only one tense exists',
      pt: 'O truque do passado: só existe um tempo',
      fr: 'L\'astuce du passé : un seul temps existe',
      it: 'Il trucco del passato: esiste un solo tempo',
      sq: 'Truku i së shkuarës: ekziston vetëm një kohë',
      tr: 'Geçmiş zaman hilesi: sadece bir zaman vardır',
    },
    body: {
      es: 'A diferencia del Hochdeutsch (que alterna entre Präteritum y Perfekt), en Schwiizerdütsch casi todo el pasado hablado se dice con el Perfekt: "ha/si" + participio. "Ich ha das gmacht" (no "ich machte das"). Aprende esta única estructura y podrás contar cualquier cosa que ya pasó.',
      en: 'Unlike Hochdeutsch (which alternates between simple past and perfect), spoken Schwiizerdütsch uses the perfect tense for almost everything: "ha/si" + past participle. "Ich ha das gmacht" (not "ich machte das"). Learn this one structure and you can narrate anything in the past.',
      pt: 'Ao contrário do Hochdeutsch (que alterna entre pretérito e perfeito), o Schwiizerdütsch falado usa quase sempre o perfeito: "ha/si" + particípio. "Ich ha das gmacht" (não "ich machte das"). Aprende esta única estrutura e conseguirás contar qualquer coisa do passado.',
      fr: 'Contrairement au Hochdeutsch (qui alterne prétérit et parfait), le suisse-allemand parlé utilise presque toujours le parfait : « ha/si » + participe passé. « Ich ha das gmacht » (pas « ich machte das »). Apprenez cette seule structure pour tout raconter au passé.',
      it: 'A differenza del Hochdeutsch (che alterna preterito e perfetto), lo svizzero-tedesco parlato usa quasi sempre il perfetto: "ha/si" + participio passato. "Ich ha das gmacht" (non "ich machte das"). Impara questa unica struttura e potrai raccontare qualsiasi cosa al passato.',
      sq: 'Ndryshe nga Hochdeutsch (që ndryshon mes së kryerës së thjeshtë dhe të kryerës), gjermanishtja zvicerane e folur përdor pothuajse gjithmonë të kryerën: "ha/si" + pjesorja. "Ich ha das gmacht" (jo "ich machte das"). Mëso këtë strukturë të vetme dhe do të mund të tregosh çdo gjë të kaluar.',
      tr: 'Hochdeutsch\'ten farklı olarak (di\'li geçmiş ve şimdiki zamanlı geçmiş arasında geçiş yapar), konuşulan İsviçre Almancası neredeyse her zaman şimdiki zamanlı geçmişi kullanır: "ha/si" + geçmiş zaman ortacı. "Ich ha das gmacht" ("ich machte das" değil). Bu tek yapıyı öğrenin, geçmişte olan her şeyi anlatabilirsiniz.',
    },
  },
  {
    title: {
      es: 'Sin genitivo: usa "vo" (de)',
      en: 'No genitive case: use "vo" (of/from)',
      pt: 'Sem genitivo: usa "vo" (de)',
      fr: 'Pas de génitif : utilisez « vo » (de)',
      it: 'Senza genitivo: usa "vo" (di)',
      sq: 'Pa gjinore: përdor "vo" (nga)',
      tr: '"-in hali" (genitif) yok: "vo" (-den) kullanılır',
    },
    body: {
      es: 'El Hochdeutsch usa el caso genitivo ("das Auto des Bruders"); el Schwiizerdütsch casi nunca lo usa hablado — dice "s\'Auto vom Brueder" (literalmente "el coche del hermano", con "vo" + dativo). Es una de las simplificaciones gramaticales más útiles que notarás.',
      en: 'Hochdeutsch uses the genitive case ("das Auto des Bruders"); spoken Schwiizerdütsch almost never does — it says "s\'Auto vom Brueder" (literally "the car of-the brother", using "vo" + dative). It\'s one of the handiest grammatical simplifications you\'ll notice.',
      pt: 'O Hochdeutsch usa o caso genitivo ("das Auto des Bruders"); o Schwiizerdütsch falado quase nunca o usa — diz "s\'Auto vom Brueder" (literalmente "o carro do irmão", com "vo" + dativo). É uma das simplificações gramaticais mais úteis que vais notar.',
      fr: 'Le Hochdeutsch utilise le génitif (« das Auto des Bruders ») ; le suisse-allemand parlé ne l\'utilise presque jamais — on dit « s\'Auto vom Brueder » (littéralement « la voiture du frère », avec « vo » + datif). C\'est l\'une des simplifications grammaticales les plus utiles que vous remarquerez.',
      it: 'Il Hochdeutsch usa il genitivo ("das Auto des Bruders"); lo svizzero-tedesco parlato quasi non lo usa mai — si dice "s\'Auto vom Brueder" (letteralmente "l\'auto del fratello", con "vo" + dativo). È una delle semplificazioni grammaticali più utili che noterai.',
      sq: 'Hochdeutsch përdor rasën gjinore ("das Auto des Bruders"); gjermanishtja zvicerane e folur pothuajse nuk e përdor kurrë — thuhet "s\'Auto vom Brueder" (fjalë për fjalë "makina e vëllait", me "vo" + rasën dhanore). Është një nga thjeshtimet gramatikore më të dobishme që do të vëresh.',
      tr: 'Hochdeutsch, -in halini (genitif) kullanır ("das Auto des Bruders"); konuşulan İsviçre Almancası bunu neredeyse hiç kullanmaz — "s\'Auto vom Brueder" denir (kelimenin tam anlamıyla "kardeşin arabası", "vo" + -e hali ile). Fark edeceğiniz en kullanışlı dilbilgisi sadeleştirmelerinden biridir.',
    },
  },
]

export function VerbsReview() {
  const { interfaceLang } = useLanguage()
  const pronouns = PRONOUNS[interfaceLang] ?? PRONOUNS.es

  return (
    <div className="space-y-4">
      {VERB_TABLES.map((verb) => (
        <Card key={verb.infinitive.schwiizerduetsch} className="card-accent-wood">
          <div className="flex items-baseline gap-2 mb-1">
            <h4 className="font-display font-bold text-lg text-swiss-red">{verb.infinitive.schwiizerduetsch}</h4>
            <span className="text-sm text-alp-400">({verb.infinitive.hochdeutsch})</span>
          </div>
          <p className="text-sm text-alp-500 dark:text-alp-300 mb-3">{verb.meaning[interfaceLang] ?? verb.meaning.es}</p>
          <div className="overflow-x-auto rounded-xl border border-alp-100 dark:border-alp-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-alp-50 dark:bg-alp-900 text-alp-500 dark:text-alp-300 text-left">
                  <th className="p-2 font-semibold">Pronombre</th>
                  <th className="p-2 font-semibold">Hochdeutsch</th>
                  <th className="p-2 font-semibold text-swiss-red">Schwiizerdütsch</th>
                </tr>
              </thead>
              <tbody>
                {pronouns.map((pronoun, idx) => (
                  <tr key={pronoun} className="border-t border-alp-100 dark:border-alp-700">
                    <td className="p-2 text-alp-700 dark:text-alp-200">{pronoun}</td>
                    <td className="p-2 text-alp-500 dark:text-alp-400">{verb.forms.hochdeutsch[idx]}</td>
                    <td className="p-2 font-semibold text-swiss-red">{verb.forms.schwiizerduetsch[idx]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ))}

      {NOTES.map((note) => (
        <Card key={note.title.es} className="card-accent-sky flex gap-3">
          <Info size={20} className="text-sky-600 dark:text-sky-300 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-alp-800 dark:text-alp-100 mb-1">{note.title[interfaceLang] ?? note.title.es}</p>
            <p className="text-sm text-alp-600 dark:text-alp-300 leading-relaxed">{note.body[interfaceLang] ?? note.body.es}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
