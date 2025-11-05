const markers = Array.from({ length: 83 }, (_, index) => index);

export function Ruler() {
  return (
    <div className="h-6 w-full border-b border-gray-300 flex items-end select-none print:hidden relative">
      <div
        id="ruler-container"
        className="max-w-[816px] mx-auto relative w-full h-full"
      >
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((marker) => {
              const position = (marker * 816) / 82;
              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 ? (
                    <>
                      <div className="absolute bottom-0 w-px h-2 bg-neutral-500" />
                      <span>{marker / 10 + 1}</span>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
