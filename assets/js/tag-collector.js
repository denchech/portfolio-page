class TagCollector {
    #tags = new Map();
    #columnCount;

    constructor(columnCount = 3) {
        if (columnCount <= 0) {
            this.#columnCount = 1
        } else {
            this.#columnCount = columnCount;
        }
    }

    collectTags() {
        let tags = document.querySelectorAll('*');

        tags.forEach((el) => this._addTagToMap(el));

        // console.log(this.#tags);
    }

    print() {
        let footer = document.querySelector('footer');
        let tagsContainer;

        for (let i = 0; i < this.#columnCount; i++) {
            tagsContainer = this._createTagContainer(i);
            footer.before(tagsContainer);
        }

        let elementsPerColumn = Math.ceil(this.#tags.size / this.#columnCount);
        if (elementsPerColumn === 0) {
            elementsPerColumn = this.#tags.size;
        }
        let currentContainerIndex = 0;
        let tagsCountInCurrentContainer = 0;
        let currentContainer = document.getElementById(this._generateTagsContainerId(currentContainerIndex));
        this.#tags.forEach((count, tag, _) => {
            if (tagsCountInCurrentContainer === elementsPerColumn) {
                currentContainer = document.getElementById(this._generateTagsContainerId(++currentContainerIndex));
                tagsCountInCurrentContainer = 0;
            }

            currentContainer.append(tag + " - " + count);
            currentContainer.append(document.createElement("br"));
            ++tagsCountInCurrentContainer;
        });
    }

    _addTagToMap(el) {
        let tagName = el.tagName;

        let count = this.#tags.get(tagName);

        if (typeof count === 'undefined') {
            count = 0;
        }

        this.#tags.set(tagName, count + 1);
    }

    _createTagContainer(index) {
        let tagsContainer = document.createElement('div');
        tagsContainer.id = this._generateTagsContainerId(index);
        tagsContainer.style.float = "left";
        tagsContainer.style.marginLeft = '20px';
        tagsContainer.style.color = 'yellow';

        return tagsContainer;
    }

    _generateTagsContainerId(index) {
        return "tagsContainer" + index;
    }
}

tagCollector = new TagCollector(3);
tagCollector.collectTags();
tagCollector.print();

