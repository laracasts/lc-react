import React, { useContext, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { TodosContext } from '../context/TodosContext'
import useToggle from '../hooks/useToggle'

function Features({ filter, setFilter, taskCount }) {

  const { tasks, setTask } = useContext(TodosContext)

  const [isFeaturesOneVisible, setIsFeaturesOneVisible] = useToggle(true)
  const [isFeaturesTwoVisible, setIsFeaturesTwoVisible] = useToggle(true)

  const [allIsCompleted, setAllIsCompleted] = useState(false)

  useEffect( () => {
    setAllIsCompleted(Object.values(tasks).every( task => task.isCompleted === true))
  }, [tasks])

  function deleteAllCompleted() {
    console.log("delete all competed task")
    setTask(tasks.filter(task => !task.isCompleted === true))
  }

  function setAllIsComplete(status) {
    console.log(`toggle ${status} to all task IsComplete`)
    setTask(tasks.map(task => { return { ...task, isCompleted: status } }))
  }

  return (
    <section>
      <div className="toggles-container">
        <button onClick={setIsFeaturesOneVisible} className="button"> Feature 1 </button>
        <button onClick={setIsFeaturesTwoVisible} className="button"> Feature 2 </button>
      </div>

      <CSSTransition
        in={isFeaturesOneVisible && tasks.length > 0}
        timeout={300}
        classNames="slide-vertical"
        unmountOnExit
      >
        <div className="check-all-container">
          <div className='button-group'>
            { !allIsCompleted ? (
              <div className="button" onClick={ () => setAllIsComplete(true) }>Check All</div>
            ) : (
              <div className="button" onClick={ () => setAllIsComplete(false) }>Uncheck All</div>
            )}
          </div>

          <span>{ taskCount.remaining } / { taskCount.all } items</span>
        </div>
      </CSSTransition>
      <CSSTransition
        in={isFeaturesTwoVisible}
        timeout={300}
        classNames="slide-vertical"
        unmountOnExit
      >
        <div className="other-buttons-container">
          <div>
            <button
              className={`button filter-button ${ filter === "" ? "filter-button-active" : ""}`}
              onClick={ () => setFilter("")}
            >
              All
            </button>
            <button
              className={`button filter-button ${ filter === false ? "filter-button-active" : ""}`}
              onClick={ () => setFilter(false)}
            >
              Active
            </button>
            <button
              className={`button filter-button ${ filter === true ? "filter-button-active" : ""}`}
              onClick={ () => setFilter(true)}
            >
              Completed
            </button>
          </div>
          <div>
            <button className="button" onClick={ () => deleteAllCompleted() }>Clear completed</button>
          </div>
        </div>
      </CSSTransition>

    </section>
  )
}

export default Features