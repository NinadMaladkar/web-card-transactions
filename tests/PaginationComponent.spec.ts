import { mount } from '@vue/test-utils';
import PaginationComponent from '../src/components/PaginationComponent.vue';
import { describe, it, expect } from 'vitest';
describe('PaginationComponent', () => {
  it('should emit "updatePage" with the previous page number when "Prev" is clicked', async () => {
    const wrapper = mount(PaginationComponent, {
      props: {
        currentPage: 2,
        totalPages: 5,
        showPagination: true,
      },
    });

    await wrapper.find('button:first-child').trigger('click');

    expect(wrapper.emitted('updatePage')).toBeTruthy();
    expect(wrapper.emitted('updatePage')![0]).toEqual([1]);
  });

  it('should emit "updatePage" with the next page number when "Next" is clicked', async () => {
    const wrapper = mount(PaginationComponent, {
      props: {
        currentPage: 2,
        totalPages: 5,
        showPagination: true,
      },
    });

    await wrapper.find('button:last-child').trigger('click');

    expect(wrapper.emitted('updatePage')).toBeTruthy();
    expect(wrapper.emitted('updatePage')![0]).toEqual([3]);
  });

  it('should disable "Prev" button on the first page', () => {
    const wrapper = mount(PaginationComponent, {
      props: {
        currentPage: 1,
        totalPages: 5,
        showPagination: true,
      },
    });

    const prevButton = wrapper.find('button:first-child');

    expect(prevButton.attributes('disabled')).toBeDefined();
  });

  it('should disable "Next" button on the last page', () => {
    const wrapper = mount(PaginationComponent, {
      props: {
        currentPage: 5,
        totalPages: 5,
        showPagination: true,
      },
    });

    const nextButton = wrapper.find('button:last-child');

    expect(nextButton.attributes('disabled')).toBeDefined();
  });
});
