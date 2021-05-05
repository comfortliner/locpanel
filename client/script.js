'use strict';

let boardInitialized = false,
    keyTrap = null,
    totalcolumns = 0;

const baseurl = location.pathname;

const getQueryStringValue = key => decodeURIComponent(window.location.search.replace(
  // eslint-disable-next-line require-unicode-regexp, prefer-template, unicorn/better-regex, no-useless-escape
  new RegExp('^(?:.*[&\\?]' + encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'
));

const getSelectedDoW = () => {
  // eslint-disable-next-line no-undef
  if (panelMode !== 'MULTI') {
    return 1;
  }

  let selectedDoWThisClient = Number.parseInt(getQueryStringValue('selectedDoW'), 10);

  if (Number.isNaN(selectedDoWThisClient) || Number.parseInt(selectedDoWThisClient, 10) < 1 || Number.parseInt(selectedDoWThisClient, 10) > 5) {
    selectedDoWThisClient = new Date().getDay();
  }

  return selectedDoWThisClient;
};

// eslint-disable-next-line no-undef
const socket = io.connect();

const sendAction = (action, data) => {
  const defaultKeyValue = {
    room: baseurl,
    boardwidth: $('.board-outline').width(),
    colcount: $('.col').length,
    selectedDoW: getSelectedDoW()
  };

  let thisData = data;

  if (typeof thisData === 'undefined' || thisData === null) {
    thisData = {};
  }

  const newData = Object.assign(thisData, defaultKeyValue);

  // eslint-disable-next-line no-console
  console.log(`${new Date().toISOString()} To Server --> ${action}, ${JSON.stringify(newData)}`);

  const message = {
    action,
    data: newData
  };

  socket.emit('message', message);
};

const unblockUI = () => {
  $.unblockUI({ fadeOut: 50 });
};

const blockUI = (message = 'Waiting...') => {
  $.blockUI({
    message,

    css: {
      border: 'none',
      padding: '15px',
      backgroundColor: '#000',
      '-webkit-border-radius': '10px',
      '-moz-border-radius': '10px',
      opacity: 0.5,
      color: '#fff',
      fontSize: '20px'
    },

    fadeOut: 0,
    fadeIn: 10
  });
};

const moveCard = (card, position, selectedDoW) => {
  if (selectedDoW === getSelectedDoW()) {
    card.animate(
      {
        left: `${position.left}px`,
        top: `${position.top}px`
      },
      500
    );
  }
};

$(document).bind('keyup', event => {
  keyTrap = event.which;
});

// ******************** cards *********************
// ************************************************

const drawNewCard = (id, text, x, y, rot, colour, animationspeed) => {
  const html = `
      <div id="${id}" class="card ${colour} draggable" style="-webkit-transform:rotate(${rot}deg);">
        <img class="card-image" src="images/${colour}-card.png">
        <div id="content:${id}" class="content stickertarget droppable">${text}</div>
        <span class="filler"></span>
      </div>
    `;

  const card = $(html);

  card.appendTo('#board');

  card.draggable({
    snap: false,
    snapTolerance: 5,
    containment: [ 0, 0, 2000, 1000 ],
    stack: '.card',
    start () {
      keyTrap = null;
    },
    drag (event, ui) {
      if (keyTrap === 27) {
        ui.helper.css(ui.originalPosition);

        return false;
      }
    },
    handle: 'div.content'
  });

  // After a drag:
  card.bind('dragstop', function (event, ui) {
    if (keyTrap === 27) {
      keyTrap = null;

      return;
    }

    if (ui.position.top < 0) {
      // eslint-disable-next-line no-param-reassign
      ui.position.top = 0;
    }

    const data = {
      id: this.id,
      position: ui.position,
      oldposition: ui.originalPosition,
      selectedDoW: getSelectedDoW()
    };

    sendAction('moveCard', data);
  });

  let speed = Math.floor(Math.random() * 1000);

  if (typeof animationspeed !== 'undefined') {
    speed = animationspeed;
  }

  const startPosition = { top: 52, left: 18 };

  card.css('top', startPosition.top - (card.height() * 0.5));
  card.css('left', startPosition.left - (card.width() * 0.5));

  card.animate(
    {
      left: `${x}px`,
      top: `${y}px`
    },
    speed
  );
};

const initCards = cardArray => {
  const selectedDoW = getSelectedDoW();

  // First delete any cards that exist
  $('.card').remove();

  for (const card in cardArray) {
    if (Object.prototype.hasOwnProperty.call(cardArray, card)) {
      const newCard = cardArray[card];

      drawNewCard(
        newCard.id,
        newCard.text,
        selectedDoW === 1 ? newCard.x1 : selectedDoW === 2 ? newCard.x2 : selectedDoW === 3 ? newCard.x3 : selectedDoW === 4 ? newCard.x4 : selectedDoW === 5 ? newCard.x5 : newCard.x1,
        selectedDoW === 1 ? newCard.y1 : selectedDoW === 2 ? newCard.y2 : selectedDoW === 3 ? newCard.y3 : selectedDoW === 4 ? newCard.y4 : selectedDoW === 5 ? newCard.y5 : newCard.y1,
        newCard.rot,
        newCard.colour,
        250
      );
    }
  }

  boardInitialized = true;
  unblockUI();
};

// ******************* columns ********************
// ************************************************

const drawNewColumn = columnName => {
  let cls = 'col';

  if (totalcolumns === 0) {
    cls = 'col first';
  }

  $('#icon-col').before(`
    <td class="${cls}" width="10%" style="display:none">
      <h2 id="col-${totalcolumns + 1}" class="editable">${columnName}</h2>
    </td>`);

  $('.col:last').fadeIn(1500);

  totalcolumns += 1;
};

const initColumns = columnArray => {
  totalcolumns = 0;

  // columns = columnArray;

  $('.col').remove();

  for (const column in columnArray) {
    if (Object.prototype.hasOwnProperty.call(columnArray, column)) {
      const newcolumn = columnArray[column];

      drawNewColumn(newcolumn);
    }
  }
};

// ******************** board *********************
// ************************************************

// const calcCardOffset = () => {
//   const offsets = {};

//   $('.card').each(() => {
//     const card = $(this);

//     $('.col').each(i => {
//       const col = $(this);

//       if (col.offset().left + col.outerWidth() > card.offset().left + card.outerWidth() || i === $('.col').length - 1) {
//         offsets[card.attr('id')] = {
//           col,
//           x: (card.offset().left - col.offset().left) / col.outerWidth()
//         };

//         return false;
//       }
//     });
//   });

//   return offsets;
// };

// const adjustCard = (offsets, doSync) => {
//   $('.card').each(() => {
//     const card = $(this);
//     const offset = offsets[this.id];

//     if (offset) {
//       const data = {
//         id: this.id,
//         position: {
//           left: offset.col.position().left + (offset.x * offset.col.outerWidth()),
//           top: Number.parseInt(card.css('top').slice(0, -2), 10)
//         },
//         oldposition: {
//           left: Number.parseInt(card.css('left').slice(0, -2), 10),
//           top: Number.parseInt(card.css('top').slice(0, -2), 10)
//         }
//       };

//       if (!doSync) {
//         card.css('left', data.position.left);
//         card.css('top', data.position.top);
//       } else {
//         // moveCard(card, data.position);
//         // sendAction('moveCard', data);
//       }
//     }
//   });
// };

// *************** socket.io events ***************
// ************************************************

const getMessage = message => {
  const { action, data } = message;

  // eslint-disable-next-line no-console
  console.log(`${new Date().toISOString()} <-- From Server ${action}, ${JSON.stringify(data)}`);

  switch (action) {
    case 'roomAccept':
      sendAction('initializeMe', null);
      break;
    case 'initCards':
      initCards(data);
      break;
    case 'initColumns':
      initColumns(data);
      break;
    case 'moveCard':
      moveCard($(`#${data.id}`), data.position, data.selectedDoW);
      break;
    default:
      // eslint-disable-next-line no-console
      console.log(`${new Date().toISOString()} Unknown action: ${action}`);
      break;
  }
};

socket.on('connect', () => {
  sendAction('joinRoom');
});

socket.on('disconnect', () => {
  blockUI('Server disconnected. Refresh page to try and reconnect...');
});

socket.on('message', message => {
  getMessage(message);
});

// ************ jquery main function **************
// ************************************************

$(() => {
  if (boardInitialized === false) {
    blockUI('<img src="images/ajax-loader.gif" width=43 height=11/>');
  }

  $('#resetCards').
    click(() => {
      // eslint-disable-next-line no-console
      sendAction('resetCards', null);
    });

  // $('.board-outline').resizable({
  //   ghost: false,
  //   minWidth: 700,
  //   minHeight: 400,
  //   maxWidth: 1440,
  //   maxHeight: 900
  // });

  // (() => {
  //   let offsets;

  //   $('.board-outline').bind('resizestart', () => {
  //     offsets = calcCardOffset();
  //   });

  //   $('.board-outline').bind('resize', () => {
  //     // adjustCard(offsets, false);
  //   });
  //   $('.board-outline').bind('resizestop', (event, ui) => {
  //     // boardResizeHappened(event, ui.size);
  //     // adjustCard(offsets, true);
  //   });
  // })();

  $('#marker').draggable({
    axis: 'x',
    containment: 'parent'
  });

  $('#eraser').draggable({
    axis: 'x',
    containment: 'parent'
  });
});
