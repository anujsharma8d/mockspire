const EmptyState = ({ title, description, onAction }) => {
  return (
    <div className="py-6 text-center">
        <p className="font-semibold">
            {title}
        </p>

        <p className="mt-2 text-sm text-[#424846] dark:text-zinc-300">
            {description}
        </p>

        <button
            type="button"
            onClick={onAction}
            className="mt-3 rounded-lg bg-[#006c49] px-4 py-2 text-sm font-medium text-white hover:bg-[#00583c]"
        >
            Start Interview
        </button>
    </div>
  );
};

export default EmptyState;