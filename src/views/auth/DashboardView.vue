<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Mobile Header -->
    <header class="lg:hidden bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div class="flex items-center justify-between px-4 py-3">
        <div class="flex items-center space-x-3">
          <button @click="isSidebarOpen = !isSidebarOpen" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Bars3Icon v-if="!isSidebarOpen" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <XMarkIcon v-else class="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <h1 class="text-lg font-bold text-gray-900 dark:text-white">Dashboard</h1>
        </div>
        <button class="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
          <span class="text-white text-sm font-medium">U</span>
        </button>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside :class="[
        'fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 lg:transform-none z-30',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]">
        <div class="flex flex-col h-full">
          <!-- Sidebar Header -->
          <div class="p-5 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <RectangleGroupIcon class="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 class="text-lg font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p class="text-xs text-gray-500 dark:text-gray-400">v2.0</p>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <nav class="flex-1 px-3 py-5 space-y-1">
            <a 
              v-for="item in menuItems" 
              :key="item.id" 
              @click="setActiveMenu(item.id); isSidebarOpen = false"
              :class="[
                'flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer',
                activeMenu === item.id 
                  ? 'bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]">
              <component :is="item.icon" class="w-5 h-5 mr-3" />
              {{ item.name }}
              <span v-if="item.id === 'dashboard' && liveProjectsCount > 0" class="ml-auto px-2 py-0.5 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200">
                {{ liveProjectsCount }}
              </span>
            </a>
          </nav>

          <!-- Sidebar Footer -->
          <div class="p-4 border-t border-gray-200 dark:border-gray-700">
            <router-link to="/">
              <div class="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div class="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                <span class="text-white text-sm font-medium">NL</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">Back to Home Page</p>
              </div>
            </div>
            </router-link>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 lg:ml-64">
        <div class="p-5 lg:p-8">
          <!-- Dashboard Overview -->
          <div v-if="activeMenu === 'dashboard'" class="space-y-8">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Welcome back! 👋</h2>
                <p class="text-gray-600 dark:text-gray-400 mt-1">Here's what's happening with your projects today.</p>
              </div>
              <div class="mt-4 lg:mt-0">
                <button 
                  @click="setActiveMenu('projects')"
                  class="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200">
                  <PlusIcon class="w-5 h-5 mr-2" />
                  New Project
                </button>
              </div>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Projects</p>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ projects.length }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">+2 from last week</p>
                  </div>
                  <div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                    <FolderIcon class="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Projects -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
              <div class="flex items-center justify-between mb-5">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Projects</h3>
                <a 
                  @click="setActiveMenu('projects')"
                  class="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer">
                  View all
                </a>
              </div>
              
              <div class="space-y-3">
                <div 
                  v-for="project in projects.slice(0, 4)" 
                  :key="project.id" 
                  class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  @click="openEditModal(project)">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <CodeBracketIcon class="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">{{ project.title }}</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">{{ project.category }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span :class="getProjectStatusColor(project.status)" class="px-2.5 py-1 text-xs font-medium rounded-full">
                      {{ project.status }}
                    </span>
                    <ChevronRightIcon class="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Projects Content -->
          <div v-else-if="activeMenu === 'projects'" class="space-y-8">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Projects</h2>
                <p class="text-gray-600 dark:text-gray-400 mt-1">Manage and track all your projects in one place.</p>
              </div>
              <div class="mt-4 lg:mt-0 flex space-x-3">
                <button 
                  @click="openAddModal"
                  class="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200">
                  <PlusIcon class="w-5 h-5 mr-2" />
                  Add Project
                </button>
              </div>
            </div>

            <!-- Projects Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <div 
                v-for="project in projects" 
                :key="project.id" 
                class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
              >
                <div class="relative h-40 rounded-lg overflow-hidden mb-4">
                  <img 
                    v-if="project.image" 
                    :src="project.image" 
                    :alt="project.title" 
                    class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <PhotoIcon class="h-10 w-10 text-gray-400" />
                  </div>
                </div>
                <div class="flex items-start justify-between mb-4">
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {{ project.title }}
                    </h3>
                    <span :class="getProjectStatusColor(project.status)" class="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full">
                      {{ project.status }}
                    </span>
                  </div>
                  <div class="relative">
                    <button 
                      @click.stop="toggleProjectMenu(project.id)"
                      class="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                      <EllipsisVerticalIcon class="w-5 h-5" />
                    </button>
                    <div 
                      v-if="openProjectId === project.id"
                      class="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 z-10">
                      <button 
                        @click="openEditModal(project); openProjectId = null"
                        class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                        Edit Project
                      </button>
                      <button 
                        @click="openDeleteModal(project); openProjectId = null"
                        class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                        Delete Project
                      </button>
                    </div>
                  </div>
                </div>

                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{{ project.description }}</p>

                <div class="space-y-3">
                  <div>
                    <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Technologies</p>
                    <div class="flex flex-wrap gap-2">
                      <span 
                        v-for="tech in project.technologies.slice(0, 3)" 
                        :key="tech" 
                        class="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs rounded-full">
                        {{ tech }}
                      </span>
                      <span 
                        v-if="project.technologies.length > 3" 
                        class="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        +{{ project.technologies.length - 3 }}
                      </span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{{ project.category }}</span>
                    <span>{{ formatDate(project.created_at) }}</span>
                  </div>
                </div>

                <div class="flex items-center justify-between mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div class="flex space-x-2">
                    <a 
                      v-if="project.demo_url" 
                      :href="project.demo_url" 
                      target="_blank" 
                      class="inline-flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                      <ExternalLinkIcon class="w-3.5 h-3.5 mr-1.5" />
                      Website Link
                    </a>
                    <a 
                      v-if="project.show_github && project.github_url" 
                      :href="project.github_url" 
                      target="_blank" 
                      class="inline-flex items-center px-3 py-1.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <CodeBracketIcon class="w-3.5 h-3.5 mr-1.5" />
                      GitHub Link
                    </a>
                  </div>
                  <div class="flex space-x-1">
                    <button 
                      @click.stop="openEditModal(project)" 
                      class="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                      <PencilSquareIcon class="w-4 h-4" />
                    </button>
                    <button 
                      @click.stop="openDeleteModal(project)" 
                      class="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      <TrashIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Sidebar Overlay -->
    <div 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false" 
      class="fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity duration-300">
    </div>

    <!-- Project Modal -->
    <Transition name="modal">
      <div 
        v-if="showModal" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          @click.self="closeModal"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300">
        </div>
        
        <div 
          class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300">
          <div class="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ isEditing ? 'Edit Project' : 'Create New Project' }}
            </h3>
            <button 
              @click="closeModal"
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <XMarkIcon class="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <form @submit.prevent="saveProject" class="p-6 space-y-6">
            <div class="grid grid-cols-1 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Title <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="modalProject.title" 
                  type="text" 
                  required 
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors" 
                  placeholder="My Awesome Project" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description <span class="text-red-500">*</span>
                </label>
                <textarea 
                  v-model="modalProject.description" 
                  required 
                  rows="4" 
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Brief description of your project..."></textarea>
              </div>

              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Project Image
                </label>
                
                <!-- Upload Controls -->
                <div class="flex items-center gap-3">
                  <label class="cursor-pointer flex-1">
                    <span class="inline-flex items-center justify-center px-4 py-2.5 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-sm">
                      <ArrowUpTrayIcon class="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                      {{ modalProject.image_url ? 'Change Image' : 'Select Image' }}
                    </span>
                    <input 
                      type="file" 
                      @change="handleImageUpload" 
                      accept="image/*" 
                      class="sr-only" />
                  </label>
                  
                  <button 
                    v-if="modalProject.image_url || modalProject.image"
                    @click.prevent="removeImage"
                    type="button"
                    class="inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-red-600 dark:text-red-400 hover:text-white dark:hover:text-white bg-red-50 dark:bg-red-900/20 hover:bg-red-500 dark:hover:bg-red-600 transition-colors duration-200">
                    <TrashIcon class="mr-2 h-5 w-5" />
                    Remove
                  </button>
                </div>

                <!-- Image Preview -->
                <div class="relative group">
                  <div v-if="modalProject.image_url || modalProject.image" class="mt-2 flex-shrink-0 h-40 w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                    <img 
                      :src="modalProject.image_url || modalProject.image" 
                      class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" 
                      alt="Project preview" />
                    <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <EyeIcon class="h-8 w-8 text-white/80" />
                    </div>
                  </div>
                  <div v-else class="mt-2 flex-shrink-0 h-40 w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700/30">
                    <PhotoIcon class="h-12 w-12 text-gray-400 mb-2" />
                    <p class="text-sm text-gray-500 dark:text-gray-400">No image selected</p>
                  </div>
                </div>

                <!-- Help text -->
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Upload JPG, PNG or GIF (Max 2MB). Recommended size: 800×600px.
                </p>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Technologies <span class="text-red-500">*</span>
                  </label>
                  <input 
                    v-model="technologiesInput" 
                    type="text" 
                    required 
                    placeholder="React, Node.js, MongoDB" 
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors" />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate with commas</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category <span class="text-red-500">*</span>
                  </label>
                  <select 
                    v-model="modalProject.category" 
                    required 
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors">
                    <option value="">Select a category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Desktop Application">Desktop Application</option>
                    <option value="API/Backend">API/Backend</option>
                    <option value="Data Science">Data Science</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Status</label>
                <div class="flex flex-wrap gap-3">
                  <label class="flex items-center cursor-pointer">
                    <input 
                      v-model="modalProject.status" 
                      type="radio" 
                      value="live" 
                      class="sr-only" />
                    <span 
                      :class="modalProject.status === 'live' ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'" 
                      class="px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Live
                    </span>
                  </label>
                  <label class="flex items-center cursor-pointer">
                    <input 
                      v-model="modalProject.status" 
                      type="radio" 
                      value="demo" 
                      class="sr-only" />
                    <span 
                      :class="modalProject.status === 'demo' ? 'bg-sky-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'" 
                      class="px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Demo
                    </span>
                  </label>
                  <label class="flex items-center cursor-pointer">
                    <input 
                      v-model="modalProject.status" 
                      type="radio" 
                      value="under-development" 
                      class="sr-only" />
                    <span 
                      :class="modalProject.status === 'under-development' ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'" 
                      class="px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Under Development
                    </span>
                  </label>
                </div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Demo URL</label>
                  <input 
                    v-model="modalProject.demo_url" 
                    type="url" 
                    placeholder="https://example.com" 
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors" />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub URL</label>
                  <input 
                    v-model="modalProject.github_url" 
                    type="url" 
                    placeholder="https://github.com/username/repo" 
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors" />
                </div>
              </div>

              <div class="flex items-center">
                <input 
                  v-model="modalProject.show_github" 
                  type="checkbox" 
                  id="show-github" 
                  class="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500" />
                <label for="show-github" class="ml-3 text-sm text-gray-700 dark:text-gray-300">Show GitHub link publicly</label>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 pt-4">
              <button 
                type="button" 
                @click="closeModal" 
                class="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium">
                Cancel
              </button>
              <button 
                type="submit" 
                class="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-md transition-all duration-200 font-medium">
                {{ isEditing ? 'Update Project' : 'Create Project' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Project Delete Confirmation Modal -->
    <Transition name="modal">
      <div 
        v-if="showDeleteModal" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          @click.self="closeDeleteModal"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300">
        </div>
        
        <div 
          class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300">
          <div class="p-6 text-center">
            <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full">
              <ExclamationTriangleIcon class="w-8 h-8 text-red-500 dark:text-red-400" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Project</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete "<span class="font-medium text-gray-900 dark:text-white">{{ deleteProject?.title }}</span>"? This action cannot be undone.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <button 
                @click="closeDeleteModal" 
                class="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium">
                Cancel
              </button>
              <button 
                @click="deleteProjectAction" 
                class="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium">
                Delete Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
// Dashboard - Admin panel for project management
import { ref, computed, onMounted } from 'vue'
import {
  PlusIcon,
  TrashIcon,
  RectangleGroupIcon,
  FolderIcon,
  Bars3Icon,
  XMarkIcon,
  PencilSquareIcon,
  ExternalLinkIcon,
  CodeBracketIcon,
  ExclamationTriangleIcon,
  EllipsisVerticalIcon,
  ChevronRightIcon,
  PhotoIcon,
  ArrowUpTrayIcon 
} from '@heroicons/vue/24/outline'
import api from '@/service/api'


// State
const activeMenu = ref('dashboard')
const isSidebarOpen = ref(false)
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const openProjectId = ref(null)
const modalProject = ref({
  id: null,
  title: '',
  description: '',
  technologies: [],
  category: '',
  status: 'live',
  demo_url: '',
  github_url: '',
  show_github: true,
  created_at: new Date().toISOString(),
  image: null, 
  image_url: ''  
})
const technologiesInput = ref('')
const deleteProject = ref(null)

// Menu items
const menuItems = ref([
  { id: 'dashboard', name: 'Dashboard', icon: RectangleGroupIcon },
  { id: 'projects', name: 'Projects', icon: FolderIcon }
])

// Projects data
const projects = ref([])

const projectsData = async () => {
  try {
    const response = await api.get('/project')
    projects.value = response.data.data.map(project => ({
      ...project,
      image_url: project.image || project.image_url || '', // Handle both fields
      technologies: Array.isArray(project.technologies) 
        ? project.technologies 
        : (typeof project.technologies === 'string' 
            ? JSON.parse(project.technologies || '[]') 
            : [])
    }))
  } catch (error) {
    console.error('Error fetching projects:', error)
    alert('Failed to load projects')
  }
}

onMounted(() => {
  projectsData()
})

// Computed properties
const liveProjectsCount = computed(() => projects.value.filter(p => p.status === 'live').length)

// Methods
const setActiveMenu = (menuId) => {
  activeMenu.value = menuId
  isSidebarOpen.value = false
}

const getProjectStatusColor = (status) => {
  switch (status) {
    case 'live':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
    case 'under-development':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
    case 'demo':
      return 'bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400'
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
  }
}


const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const toggleProjectMenu = (projectId) => {
  openProjectId.value = openProjectId.value === projectId ? null : projectId
}

const resetModal = () => {
  modalProject.value = {
    id: null,
    title: '',
    description: '',
    technologies: [],
    category: '',
    status: 'live',
    demo_url: '',
    github_url: '',
    show_github: true,
    created_at: new Date().toISOString()
  }
  technologiesInput.value = ''
  isEditing.value = false
}

const openAddModal = () => {
  resetModal()
  showModal.value = true
}

const openEditModal = (project) => {
  modalProject.value = { 
    ...project,
    image_url: project.image || project.image_url,
    // Fix: Ensure technologies is always an array
    technologies: Array.isArray(project.technologies) 
      ? project.technologies 
      : (typeof project.technologies === 'string' 
          ? JSON.parse(project.technologies || '[]') 
          : [])
  }
  
  // Fix: Handle technologies input properly
  technologiesInput.value = Array.isArray(project.technologies) 
    ? project.technologies.join(', ') 
    : (typeof project.technologies === 'string' 
        ? JSON.parse(project.technologies || '[]').join(', ') 
        : '')
  
  isEditing.value = true
  showModal.value = true
  openProjectId.value = null
}

const closeModal = () => {
  showModal.value = false
  resetModal()
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB')
      return
    }
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
    if (!validTypes.includes(file.type)) {
      alert('Only JPG, PNG, or GIF images are allowed')
      return
    }

    // Convert image to base64
    const reader = new FileReader()
    reader.onload = (e) => {
      modalProject.value.image = e.target.result // Base64 for API
      modalProject.value.image_url = e.target.result // For preview
    }
    reader.onerror = (error) => {
      console.error('Error reading file:', error)
      alert('Error reading image file')
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  modalProject.value.image = null
  modalProject.value.image_url = null
}

const saveProject = async () => {
  const technologies = technologiesInput.value
    .split(',')
    .map(tech => tech.trim())
    .filter(tech => tech.length > 0)
  
  // Prepare project data for API
  const projectData = {
    title: modalProject.value.title,
    description: modalProject.value.description,
    technologies: technologies, // Make sure this is an array
    category: modalProject.value.category,
    status: modalProject.value.status,
    demo_url: modalProject.value.demo_url || null,
    github_url: modalProject.value.github_url || null,
    show_github: modalProject.value.show_github
  }

  // Add image data if present (only if it's a new image)
  if (modalProject.value.image && modalProject.value.image.startsWith('data:')) {
    projectData.image = modalProject.value.image
  }

  try {
    if (isEditing.value) {
      // Update existing project
      const response = await api.put(`/project/${modalProject.value.id}`, projectData)
      
      console.log('Update response:', response.data) // Debug log
      
      if (response.data.status) {
        // Update local projects array
        const index = projects.value.findIndex(p => p.id === modalProject.value.id)
        if (index !== -1) {
          projects.value[index] = {
            ...response.data.data,
            image_url: response.data.data.image || response.data.data.image_url,
            // Ensure technologies is properly handled
            technologies: Array.isArray(response.data.data.technologies) 
              ? response.data.data.technologies 
              : (typeof response.data.data.technologies === 'string' 
                  ? JSON.parse(response.data.data.technologies || '[]') 
                  : [])
          }
        }
        closeModal()
      } else {
        console.error('Update failed:', response.data.message)
        alert('Failed to update project: ' + (response.data.message || 'Unknown error'))
      }
    } else {
      // Create new project logic...
      const response = await api.post('/project', projectData)
      
      if (response.data.status) {
        const newProject = {
          ...response.data.data,
          image_url: response.data.data.image || response.data.data.image_url,
          technologies: Array.isArray(response.data.data.technologies) 
            ? response.data.data.technologies 
            : (typeof response.data.data.technologies === 'string' 
                ? JSON.parse(response.data.data.technologies || '[]') 
                : [])
        }
        projects.value.unshift(newProject)
        closeModal()
      } else {
        console.error('Creation failed:', response.data.message)
        alert('Failed to create project: ' + (response.data.message || 'Unknown error'))
      }
    }
  } catch (error) {
    console.error('Error saving project:', error)
    
    // Better error handling
    if (error.response) {
      // Server responded with error status
      console.error('Server error:', error.response.data)
      if (error.response.data?.message) {
        alert('Error: ' + error.response.data.message)
      } else if (error.response.data?.errors) {
        const errors = Object.values(error.response.data.errors).flat()
        alert('Validation errors: ' + errors.join(', '))
      } else {
        alert('Server error: ' + error.response.status)
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error:', error.request)
      alert('Network error: Please check your connection')
    } else {
      // Something else happened
      console.error('Error:', error.message)
      alert('An unexpected error occurred: ' + error.message)
    }
  }
}

const openDeleteModal = (project) => {
  deleteProject.value = project
  showDeleteModal.value = true
  openProjectId.value = null
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  deleteProject.value = null
}

const deleteProjectAction = async () => {
  if (deleteProject.value) {
    try {
      await api.delete(`/project/${deleteProject.value.id}`)
      const index = projects.value.findIndex(p => p.id === deleteProject.value.id)
      if (index !== -1) {
        projects.value.splice(index, 1)
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      // For demo purposes, still update the local state
      const index = projects.value.findIndex(p => p.id === deleteProject.value.id)
      if (index !== -1) {
        projects.value.splice(index, 1)
      }
    }
  }
  closeDeleteModal()
}
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark ::-webkit-scrollbar-track {
  background: #1f2937;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Text line clamp */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
  opacity: 0;
}

/* Focus styles */
.focus-visible:focus {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}

/* Add to your style section */
.image-preview {
  transition: all 0.3s ease;
}

.image-preview:hover {
  transform: scale(1.02);
}

.file-upload-input {
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Responsive text sizes */
@media (max-width: 640px) {
  .text-3xl {
    font-size: 1.875rem;
    line-height: 2.25rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }
  
  .text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
}

/* Improved accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Button hover effects */
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Card hover effects */
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Loading states */
.loading {
  opacity: 0.6;
  pointer-events: none;
}

/* Empty state styling */
.empty-state {
  opacity: 0.6;
  filter: grayscale(0.3);
}

/* Dark mode improvements */
.dark .glass-effect {
  background: rgba(17, 24, 39, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(75, 85, 99, 0.3);
}

.glass-effect {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(229, 231, 235, 0.3);
}

/* Custom radio button styles */
.radio-button {
  transition: all 0.2s ease;
  cursor: pointer;
  user-select: none;
}

.radio-button:hover {
  transform: scale(1.05);
}

.radio-button.selected {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Better focus indicators */
.focus-ring:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.5);
}

/* Improved button states */
.btn-primary {
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-primary:hover::before {
  left: 100%;
}

/* Custom animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}
</style>