/**
 * @jest-environment jsdom
 */

import { TaskLayoutOptions } from '../src/Layout/TaskLayoutOptions';
import { QueryLayoutOptions } from '../src/QueryLayoutOptions';
import { TaskLayout } from '../src/TaskLayout';

describe('TaskLayout tests', () => {
    it('should generate expected CSS components for default layout', () => {
        const taskLayout = new TaskLayout();
        expect(taskLayout.shownTaskLayoutComponents().join('\n')).toMatchInlineSnapshot(`
            "description
            priority
            recurrenceRule
            createdDate
            startDate
            scheduledDate
            dueDate
            cancelledDate
            doneDate
            blockLink"
        `);
        expect(taskLayout.hiddenTaskLayoutComponents().join('\n')).toMatchInlineSnapshot('""');
        expect(taskLayout.taskListHiddenClasses().join('\n')).toMatchInlineSnapshot('"tasks-layout-hide-urgency"');
    });

    it('should generate expected CSS components with all default option reversed', () => {
        const queryLayoutOptions = new QueryLayoutOptions();
        // Negate all the query layout boolean values:
        Object.keys(queryLayoutOptions).forEach((key) => {
            const key2 = key as keyof QueryLayoutOptions;
            queryLayoutOptions[key2] = !queryLayoutOptions[key2];
        });

        const taskLayoutOptions = new TaskLayoutOptions();
        taskLayoutOptions.toggleVisibilityExceptDescriptionAndBlockLink();

        const taskLayout = new TaskLayout(taskLayoutOptions, queryLayoutOptions);

        expect(taskLayout.shownTaskLayoutComponents().join('\n')).toMatchInlineSnapshot(`
            "description
            blockLink"
        `);
        expect(taskLayout.hiddenTaskLayoutComponents().join('\n')).toMatchInlineSnapshot(`
            "priority
            recurrenceRule
            createdDate
            startDate
            scheduledDate
            dueDate
            cancelledDate
            doneDate"
        `);
        expect(taskLayout.taskListHiddenClasses().join('\n')).toMatchInlineSnapshot(`
            "tasks-layout-hide-priority
            tasks-layout-hide-recurrenceRule
            tasks-layout-hide-createdDate
            tasks-layout-hide-startDate
            tasks-layout-hide-scheduledDate
            tasks-layout-hide-dueDate
            tasks-layout-hide-cancelledDate
            tasks-layout-hide-doneDate
            tasks-layout-hide-tags
            tasks-layout-hide-backlinks
            tasks-layout-hide-edit-button
            tasks-layout-hide-postpone-button
            tasks-layout-short-mode"
        `);
    });
});
