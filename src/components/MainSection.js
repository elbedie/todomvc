import React from 'react'
import PropTypes from 'prop-types'
import Footer from './Footer'
import VisibleTodoList from '../containers/VisibleTodoList'

const UndoIcon = () => (
  <svg width="18" height="18" fill="none" style={{ marginRight: 8, marginLeft: -2 }} viewBox="0 0 24 24">
    <path d="M9 7v4H5M20 17a7 7 0 0 0-7-7H5"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const RedoIcon = () => (
  <svg width="18" height="18" fill="none" style={{ marginRight: 8, marginLeft: -2 }} viewBox="0 0 24 24">
    <path d="M15 7v4h4M4 17a7 7 0 0 1 7-7h8"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const undoColor = "#2563eb";
const redoColor = "#16a34a";
const disabledBg = "#f3f4f6";
const disabledText = "#bdbdbd";

const colorBtn = (enabled, color) => ({
  background: enabled ? color : disabledBg,
  color: enabled ? "#fff" : disabledText,
  border: 'none',
  borderRadius: 22,
  fontWeight: 500,
  fontSize: 18,
  boxShadow: enabled ? "0 2px 8px rgba(38,39,76,.10)" : "none",
  padding: "10px 24px 10px 16px",
  margin: "0 8px",
  minHeight: 44,
  width: 155,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: enabled ? "pointer" : "not-allowed",
  transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
  outline: "none",
  letterSpacing: ".02em"
})

const btnContainer = {
  margin: "38px 0 24px 0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

function handleMouseOver(e, enabled, color) {
  if (enabled) e.currentTarget.style.background = shade(color, 0.85);
}
function handleMouseOut(e, enabled, color) {
  if (enabled) e.currentTarget.style.background = color;
}

function shade(hex, lum = 0.8) { // lum de 0 a 1
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  let rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i*2,2),16);
    c = Math.round(Math.min(Math.max(0, c+(c*lum - c)),255)).toString(16);
    rgb += ("00"+c).substr(c.length);
  }
  return rgb;
}

const MainSection = ({
  todosCount,
  completedCount,
  actions,
  canUndo,
  canRedo,
}) => (
  <section className="main">
    {!!todosCount && (
      <span>
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todosCount}
          readOnly
        />
        <label onClick={actions.completeAllTodos}/>
      </span>
    )}
    <VisibleTodoList />

    <div style={btnContainer}>
      <button
        style={colorBtn(canUndo, undoColor)}
        onClick={actions.undo}
        disabled={!canUndo}
        title="Desfazer (Ctrl+Z)"
        onMouseOver={e => handleMouseOver(e, canUndo, undoColor)}
        onMouseOut={e => handleMouseOut(e, canUndo, undoColor)}
      >
        <UndoIcon /> Desfazer
      </button>
      <button
        style={colorBtn(canRedo, redoColor)}
        onClick={actions.redo}
        disabled={!canRedo}
        title="Refazer (Ctrl+Y)"
        onMouseOver={e => handleMouseOver(e, canRedo, redoColor)}
        onMouseOut={e => handleMouseOut(e, canRedo, redoColor)}
      >
        <RedoIcon /> Refazer
      </button>
    </div>

    {!!todosCount && (
      <Footer
        completedCount={completedCount}
        activeCount={todosCount - completedCount}
        onClearCompleted={actions.clearCompleted}
      />
    )}
  </section>
)

MainSection.propTypes = {
  todosCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
  canUndo: PropTypes.bool.isRequired,
  canRedo: PropTypes.bool.isRequired,
}
export default MainSection