import './Header.css'
import {Button} from "../../components/Button/Button.tsx";

export function Header() {

    const onImport = () => {
        console.log("Import JSON clicked");
    }

    const onExport = () => {
        console.log("Export JSON clicked");
    }

    const onAddTitle = () => {
        console.log("Add Title clicked");
    }

    return (
        <header className="toolbar">
            <div className="toolbar__brand">
                <span className="toolbar__logo" aria-hidden="true" />
                <strong className="toolbar__title">Éditeur de titres</strong>
                {/*<span className="toolbar__meta">{fileName} · {duration} s</span>*/}
            </div>
            <div className="toolbar__actions">
                <Button text="Importer JSON" onButtonClick={onImport} />
                <Button text="Exporter JSON" onButtonClick={onExport} />
                <Button text="+ Ajouter un titre" className="btn--primary" onButtonClick={onAddTitle} />
            </div>
        </header>
    )
}