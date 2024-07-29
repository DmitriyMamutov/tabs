import React, { useState, useEffect } from 'react';
import { DATA_LIST, ARROW, REMOVE } from 'constants/index';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import cn from 'classnames';
import Tab from './components/Tab';
import { ReactSVG } from 'react-svg';

import styles from './styles.module.scss';

const Home = () => {
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem('peristedList')) || DATA_LIST,
  );
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem('peristedList', JSON.stringify(list));
  }, [list]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);
  };

  const handleAttach = (idx) => {
    setList(
      list.map((item) =>
        item.id === idx ? { ...item, isAttached: true } : item,
      ),
    );
  };

  const handleDelete = (idx) => {
    setList(list.filter((item) => (item.id === idx ? null : item)));
  };

  const handleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  return (
    <section className={styles['home']}>
      <div className="container">
        <div className={styles['home-header']}>
          <div className={styles['home-header-attached']}>
            {list?.map(({ id, text, isAttached, iconUrl }) => {
              if (isAttached) {
                return (
                  <div
                    key={id}
                    className={cn(
                      styles['home-header-list-tab'],
                      styles['home-header-list-tab--attached'],
                    )}
                  >
                    {/* <div className={styles['home-header-list-tab__text']}>
                      {text}
                    </div> */}
                    <div
                      className={cn(
                        styles['home-header-list-tab__icon'],
                        styles['home-header-list-tab__icon--attached'],
                      )}
                    >
                      <ReactSVG src={iconUrl} />
                    </div>
                  </div>
                );
              }
            })}
          </div>

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="list" direction="horizontal">
              {(provided) => (
                <div
                  className={styles['home-header-list']}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {list?.map(
                    ({ id, text, isAttached, isVisible, iconUrl }, index) => {
                      if (!isAttached && isVisible) {
                        return (
                          <Draggable key={id} draggableId={id} index={index}>
                            {(provided, snapshot) => (
                              <Tab
                                id={id}
                                list={list}
                                iconUrl={iconUrl}
                                setList={setList}
                                provided={provided}
                                text={text}
                                handleAttach={handleAttach}
                                handleDelete={handleDelete}
                                snapshot={snapshot}
                              />
                            )}
                          </Draggable>
                        );
                      }
                    },
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className={styles['home-header-dropdown']}>
            <div
              onClick={handleDropdown}
              className={cn(styles['home-header-dropdown-button'], {
                [styles['home-header-dropdown-button--active']]:
                  dropdownVisible,
              })}
            >
              <div
                className={cn(styles['home-header-dropdown-button__arrow'], {
                  [styles['home-header-dropdown-button__arrow--active']]:
                    dropdownVisible,
                })}
              >
                <ReactSVG src={ARROW} />
              </div>
            </div>
            <div
              className={cn(styles['home-header-dropdown-list'], {
                [styles['home-header-dropdown-list--active']]: dropdownVisible,
              })}
            >
              {list?.map(({ id, text, isVisible, iconUrl }) => {
                if (!isVisible) {
                  return (
                    <div
                      key={id}
                      className={styles['home-header-dropdown-list-item']}
                    >
                      <div
                        className={
                          styles['home-header-dropdown-list-item__icon']
                        }
                      >
                        <ReactSVG src={iconUrl} />
                      </div>
                      <div
                        className={
                          styles['home-header-dropdown-list-item__text']
                        }
                      >
                        {text}
                      </div>

                      <div
                        className={
                          styles['home-header-dropdown-list-item__remove']
                        }
                        onClick={() => handleDelete(id)}
                      >
                        <ReactSVG src={REMOVE} />
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>

        <div className={styles['home-field']}>
          <div className={styles['home-field-block']} />
        </div>
      </div>
    </section>
  );
};

export default Home;
