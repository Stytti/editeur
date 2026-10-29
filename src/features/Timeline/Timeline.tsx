export function Timeline() {
    return (
        <section className="timeline">
            <div className="timeline__toolbar">
                <div className="timeline__tools">
                    <button type="button" className="icon-btn" aria-label="Annuler">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 14 4 9l5-5" /><path d="M4 9h10a6 6 0 0 1 0 12h-3" /></svg>
                    </button>
                    <button type="button" className="icon-btn" aria-label="Rétablir">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 14 5-5-5-5" /><path d="M20 9H10a6 6 0 0 0 0 12h3" /></svg>
                    </button>
                    <span className="timeline__divider" />
                    <button type="button" className="icon-btn" aria-label="Dupliquer le titre">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>
                    </button>
                    <button type="button" className="icon-btn" aria-label="Supprimer le titre">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 7h16" /><path d="M10 11v6M14 11v6" /><path d="M6 7l1 13h10l1-13" /><path d="M9 7V4h6v3" /></svg>
                    </button>
                </div>

                {/*<span className="timecode">{formatTime(currentTime)}*/}
                {/*    <span className="timecode__total"> / {formatTime(duration)}</span>*/}
                {/*</span>*/}

                <label className="timeline__zoom">
                    <span className="sr-only">Zoom de la timeline</span>
                    <input type="range" min={1} max={10} defaultValue={3} />
                </label>
            </div>

            <div className="timeline__body">
                {/* En-têtes de pistes */}
                {/*<div className="track-headers">*/}
                {/*    {tracks.map((t) => (*/}
                {/*        <div key={t.id} className="track-header">*/}
                {/*            <span className="track-header__type">T</span>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*    <div className="track-header track-header--video">Vidéo</div>*/}
                {/*</div>*/}

                {/* Pistes */}
                {/*<div className="tracks">*/}
                {/*    <div className="tracks__lane">*/}
                {/*        <div className="ruler" style={rulerStyle}>*/}
                {/*            {majorMarks.map((s) => (*/}
                {/*                <span key={s} className="ruler__mark" style={{ left: pct(s, duration) }}>*/}
                {/*  <span className="ruler__label">{formatTime(s).slice(0, 5)}</span>*/}
                {/*</span>*/}
                {/*            ))}*/}
                {/*        </div>*/}

                {/*        {tracks.map((t) => {*/}
                {/*            const selected = t.id === selectedId;*/}
                {/*            return (*/}
                {/*                <div key={t.id} className="track">*/}
                {/*                    <div*/}
                {/*                        className={selected ? "clip clip--selected" : "clip"}*/}
                {/*                        style={{ left: pct(t.startTime, duration), width: pct(t.endTime - t.startTime, duration) }}*/}
                {/*                        onPointerDown={() => onSelect(t.id)}*/}
                {/*                    >*/}
                {/*                        {selected && <span className="clip__trim" aria-label="Début" />}*/}
                {/*                        <span className="clip__label">*/}
                {/*      <span className="clip__icon">T</span>*/}
                {/*                            {t.text || "Sans texte"}*/}
                {/*    </span>*/}
                {/*                        {selected && <span className="clip__trim" aria-label="Fin" />}*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            );*/}
                {/*        })}*/}

                {/*        <div className="track track--video">*/}
                {/*            <span className="track--video__label">clip.mp4 · {formatTime(duration)}</span>*/}
                {/*        </div>*/}

                {/*        <div className="playhead" style={{ left: pct(currentTime, duration) }} />*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </section>
    )
}