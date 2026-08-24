import { Sun, Moon, Laptop, Globe, Type, Users, FlaskConical, Bell, Trash2, MapPin } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'
import { SUPPORTED_LANGUAGES } from '../../data/i18n/strings.js'
import { CANTONS } from '../../data/cantons/holidays.js'
import { Card } from '../ui/Card.jsx'
import { Button } from '../ui/Button.jsx'

const AGE_GROUPS = [
  { id: 'teen', label: '≤ 17', descKey: 'ageTeen' },
  { id: 'young-adult', label: '18–35', descKey: 'ageYoungAdult' },
  { id: 'adult', label: '36–55', descKey: 'ageAdult' },
  { id: 'senior', label: '55+', descKey: 'ageSenior' },
]

const TEXT_SIZES = [
  { id: 'normal', labelKey: 'textSizeNormal' },
  { id: 'grande', labelKey: 'textSizeLarge' },
  { id: 'muy-grande', labelKey: 'textSizeXLarge' },
]

const THEME_MODES = [
  { id: 'light', labelKey: 'themeLight', icon: Sun },
  { id: 'dark', labelKey: 'themeDark', icon: Moon },
  { id: 'system', labelKey: 'themeSystem', icon: Laptop },
]

function Section({ icon: Icon, title, accent = 'alp', children }) {
  return (
    <Card className={`card-accent-${accent}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon size={18} className="text-alp-500 dark:text-alp-300" />
        <h3 className="font-display font-bold text-alp-900 dark:text-alp-50">{title}</h3>
      </div>
      {children}
    </Card>
  )
}

function SegmentedControl({ options, value, onChange, renderLabel }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = opt.id === value
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`nav-item px-3 py-2 rounded-xl text-sm font-semibold border transition-colors min-h-[44px]
              ${active
                ? 'bg-swiss-red text-white border-swiss-red shadow-sm'
                : 'bg-white dark:bg-alp-900 text-alp-700 dark:text-alp-200 border-alp-300 dark:border-alp-600 hover:border-swiss-red/50'}`}
          >
            {renderLabel ? renderLabel(opt) : opt.label}
          </button>
        )
      })}
    </div>
  )
}

export function SettingsScreen() {
  const { interfaceLang, setInterfaceLang, t } = useLanguage()
  const { progress, setCanton, updateSettings, resetProgress } = useUserProgress()
  const { themeMode, setThemeMode } = useTheme()

  function setTextSize(size) {
    updateSettings({ textSize: size })
    document.documentElement.setAttribute('data-text-size', size)
  }

  function handleReset() {
    if (window.confirm(t('settingsResetConfirm'))) {
      resetProgress()
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-4 pb-24">
      <h2 className="font-display font-bold text-2xl text-alp-900 dark:text-alp-50">{t('settings')}</h2>

      <Section icon={Moon} title={t('settingsAppearance')} accent="alp">
        <p className="text-sm text-alp-500 dark:text-alp-300 mb-2">{t('settingsTheme')}</p>
        <SegmentedControl
          options={THEME_MODES}
          value={themeMode}
          onChange={setThemeMode}
          renderLabel={(opt) => (
            <span className="flex items-center gap-1.5">
              <opt.icon size={14} /> {t(opt.labelKey)}
            </span>
          )}
        />
        <p className="text-sm text-alp-500 dark:text-alp-300 mt-4 mb-2 flex items-center gap-1.5">
          <Type size={14} /> {t('settingsTextSize')}
        </p>
        <SegmentedControl
          options={TEXT_SIZES}
          value={progress.settings.textSize}
          onChange={setTextSize}
          renderLabel={(opt) => t(opt.labelKey)}
        />
      </Section>

      <Section icon={Globe} title={t('settingsInterfaceLang')} accent="sky">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setInterfaceLang(lang.code)}
              className={`nav-item flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold border transition-colors min-h-[44px]
                ${interfaceLang === lang.code
                  ? 'bg-swiss-red text-white border-swiss-red shadow-sm'
                  : 'bg-white dark:bg-alp-900 text-alp-700 dark:text-alp-200 border-alp-300 dark:border-alp-600 hover:border-swiss-red/50'}`}
            >
              <span>{lang.flag}</span> {lang.label}
            </button>
          ))}
        </div>
      </Section>

      <Section icon={MapPin} title={t('settingsCanton')} accent="wood">
        <div className="flex flex-wrap gap-2">
          {CANTONS.map((canton) => (
            <button
              key={canton.id}
              onClick={() => setCanton(canton.id)}
              className={`nav-item px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors
                ${progress.canton === canton.id
                  ? 'text-white border-transparent shadow-card'
                  : 'bg-white dark:bg-alp-900 text-alp-700 dark:text-alp-200 border-alp-300 dark:border-alp-600'}`}
              style={progress.canton === canton.id ? { backgroundColor: canton.color } : undefined}
            >
              {canton.name}
            </button>
          ))}
        </div>
      </Section>

      <Section icon={Users} title={t('settingsProfile')} accent="cheese">
        <p className="text-sm text-alp-500 dark:text-alp-300 mb-2">{t('settingsProfileBody')}</p>
        <SegmentedControl
          options={AGE_GROUPS}
          value={progress.settings.ageGroup}
          onChange={(id) => updateSettings({ ageGroup: id })}
          renderLabel={(opt) => (
            <span className="flex flex-col items-center leading-tight">
              <span>{opt.label}</span>
              <span className="text-[10px] font-normal opacity-80">{t(opt.descKey)}</span>
            </span>
          )}
        />
      </Section>

      <Section icon={Bell} title={t('settingsReminders')} accent="meadow">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-alp-700 dark:text-alp-200">{t('settingsRemindersBody')}</span>
          <input
            type="checkbox"
            checked={progress.settings.reviewRemindersEnabled}
            onChange={(e) => updateSettings({ reviewRemindersEnabled: e.target.checked })}
            className="w-5 h-5 accent-swiss-red shrink-0 ml-3"
          />
        </label>
      </Section>

      <Section icon={FlaskConical} title={t('settingsTestMode')} accent="alp">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-alp-700 dark:text-alp-200">{t('settingsTestModeBody')}</span>
          <input
            type="checkbox"
            checked={progress.settings.testModeUnlockAll}
            onChange={(e) => updateSettings({ testModeUnlockAll: e.target.checked })}
            className="w-5 h-5 accent-swiss-red shrink-0 ml-3"
          />
        </label>
      </Section>

      <Card className="card-accent-wood">
        <div className="flex items-center gap-2 mb-2">
          <Trash2 size={18} className="text-swiss-red" />
          <h3 className="font-display font-bold text-alp-900 dark:text-alp-50">{t('settingsResetTitle')}</h3>
        </div>
        <p className="text-sm text-alp-500 dark:text-alp-300 mb-3">{t('settingsResetBody')}</p>
        <Button variant="secondary" onClick={handleReset} className="w-full !text-swiss-red">
          {t('settingsResetButton')}
        </Button>
      </Card>
    </div>
  )
}
