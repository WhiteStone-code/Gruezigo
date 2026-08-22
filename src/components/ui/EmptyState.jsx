export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="text-center py-10 px-4">
      <div className="w-16 h-16 mx-auto rounded-full bg-cheese-100 dark:bg-cheese-900/40 flex items-center justify-center mb-4 text-3xl">
        {icon}
      </div>
      <p className="font-display font-bold text-alp-900 dark:text-alp-50 mb-1">{title}</p>
      {description && <p className="text-sm text-alp-500 dark:text-alp-300 mb-4">{description}</p>}
      {action}
    </div>
  )
}
