const todos = [];
        const taskInput = document.getElementById("taskInput");
        const addBtn = document.getElementById("addBtn");
        const todoList = document.getElementById("todoList");
        const emptyMsg = document.getElementById("emptyMsg");

        function updateEmptyMsg() {
            emptyMsg.style.display = todos.length === 0 ? "block" : "none";
        }

        function renderTask(task, index) {
            const item = document.createElement("div");
            item.className = "todo-item";
            if (task.completed) item.classList.add("completed");

            const p = document.createElement("p");
            p.textContent = task.text;

            const actions = document.createElement("div");
            actions.className = "actions";

            // Complete button
            const completeBtn = document.createElement("button");
            completeBtn.className = "complete-btn";
            completeBtn.textContent = task.completed ? "Undo" : "Done";
            completeBtn.addEventListener("click", () => {
                task.completed = !task.completed;
                item.classList.toggle("completed");
                completeBtn.textContent = task.completed ? "Undo" : "Done";
            });

            // Edit button
            const editBtn = document.createElement("button");
            editBtn.className = "edit-btn";
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => {
                if (item.querySelector("input")) return; // already editing

                const editInput = document.createElement("input");
                editInput.type = "text";
                editInput.value = task.text;

                const saveBtn = document.createElement("button");
                saveBtn.className = "save-btn";
                saveBtn.textContent = "Save";

                // Hide original elements
                p.style.display = "none";
                actions.style.display = "none";

                item.insertBefore(editInput, p);
                item.appendChild(saveBtn);
                editInput.focus();

                saveBtn.addEventListener("click", () => {
                    const newText = editInput.value.trim();
                    if (newText) {
                        task.text = newText;
                        p.textContent = newText;
                    }
                    editInput.remove();
                    saveBtn.remove();
                    p.style.display = "block";
                    actions.style.display = "flex";
                });

                // Save on Enter
                editInput.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") saveBtn.click();
                });
            });

            // Delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                todos.splice(index, 1);
                item.remove();
                // Re-render to fix indexes (simple way)
                todoList.innerHTML = "";
                todos.forEach((t, i) => renderTask(t, i));
                updateEmptyMsg();
            });

            actions.append(completeBtn, editBtn, deleteBtn);
            item.append(p, actions);
            todoList.appendChild(item);
        }

        function addTodo() {
            const text = taskInput.value.trim();
            if (!text) return;

            const task = { text, completed: false };
            todos.unshift(task);
            todoList.innerHTML = "";
            todos.forEach((t, i) => renderTask(t, i));
            taskInput.value = "";
            taskInput.focus();
            updateEmptyMsg();
        }

        addBtn.addEventListener("click", addTodo);
        taskInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") addTodo();
        });

        updateEmptyMsg();