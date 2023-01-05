// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';

const ModalNotes = ({notes}) => {
  return (
    <div className="mt-6">
      <h1 className="text-xl font-semibold text-white">
      Note
      </h1>
      <ul className="list-disc text-secondary space-y-2 pt-2 ml-3">
        {
          notes.map(note => {
            return <ModalNote key={note} note={note} />;
          })
        }
      </ul>
    </div>
  );
};

ModalNotes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.string)
};


const ModalNote = ({note}) => {
  return (
    <li >
      <h2 className="mt-5 text-sm text-secondary tracking-tight">
        {note}
      </h2>
    </li>
  );
};

ModalNote.propTypes = {
  note: PropTypes.string
};

export default ModalNotes;
