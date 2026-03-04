export default function Loading() {
    return (
        <div className="w-full h-screen bg-black flex flex-col items-center justify-center gap-4">
            {/* Elegant dark theme spinner for gallery */}
            <div className="w-8 h-8 rounded-full border-[1.5px] border-gray-800 border-t-gray-200 animate-spin" />
            <p className="font-serif text-sm text-gray-500 tracking-widest uppercase animate-pulse">
                Loading Gallery...
            </p>
        </div>
    );
}
