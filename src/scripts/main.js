'use strict';

(() => {
  const table = document.querySelector('.field');

  if (!table) {
    return;
  }

  const btnAddRow = document.querySelector('.append-row');
  const btnRemRow = document.querySelector('.remove-row');
  const btnAddCol = document.querySelector('.append-column');
  const btnRemCol = document.querySelector('.remove-column');

  const MIN = 2;
  const MAX = 10;

  const getRowCount = () => table.rows.length;
  const getColCount = () => table.rows[0]?.cells.length ?? 0;

  const updateControls = () => {
    const rows = getRowCount();
    const cols = getColCount();

    if (btnAddRow) {
      btnAddRow.disabled = rows >= MAX;
    }

    if (btnRemRow) {
      btnRemRow.disabled = rows <= MIN;
    }

    if (btnAddCol) {
      btnAddCol.disabled = cols >= MAX;
    }

    if (btnRemCol) {
      btnRemCol.disabled = cols <= MIN;
    }
  };

  const createRow = (cols) => {
    const tr = document.createElement('tr');

    for (let i = 0; i < cols; i += 1) {
      tr.appendChild(document.createElement('td'));
    }

    return tr;
  };

  const appendRow = () => {
    if (getRowCount() < MAX) {
      const cols = getColCount();

      (table.tBodies[0] || table).appendChild(createRow(cols));
    }
    updateControls();
  };

  const removeRow = () => {
    if (getRowCount() > MIN) {
      table.deleteRow(-1);
    }
    updateControls();
  };

  const appendColumn = () => {
    const cols = getColCount();

    if (cols >= MAX) {
      return;
    }

    Array.from(table.rows).forEach((row) => {
      row.appendChild(document.createElement('td'));
    });

    updateControls();
  };

  const removeColumn = () => {
    const cols = getColCount();

    if (cols <= MIN) {
      return;
    }

    Array.from(table.rows).forEach((row) => {
      row.deleteCell(-1);
    });

    updateControls();
  };

  btnAddRow?.addEventListener('click', appendRow);
  btnRemRow?.addEventListener('click', removeRow);
  btnAddCol?.addEventListener('click', appendColumn);
  btnRemCol?.addEventListener('click', removeColumn);

  updateControls();
})();
