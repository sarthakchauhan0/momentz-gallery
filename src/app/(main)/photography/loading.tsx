export default function Loading() {
    return (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
            {/* Elegant luxury spinner */}
            <div className="w-8 h-8 rounded-full border-[1.5px] border-gray-200 border-t-black animate-spin" />
            <p className="font-serif text-sm text-gray-400 tracking-widest uppercase animate-pulse">
                Curating...
            </p>
        </div>
    );
}
