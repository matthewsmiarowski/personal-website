'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import '../globals.css'
import './projects.css'
import { useGodMode } from '../context/GodModeContext'
import ProjectFormModal from '../components/ProjectFormModal'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import { ProjectDB } from '@/lib/supabase'

// ============================================
// HELPER COMPONENTS
// ============================================

interface ProjectCardProps {
  project: ProjectDB
  isGodMode: boolean
  onEdit: (project: ProjectDB) => void
  onDelete: (project: ProjectDB) => void
}

function ProjectCard({ project, isGodMode, onEdit, onDelete }: ProjectCardProps) {
  return (
    <article className="project-card">
      {/* God Mode Actions */}
      {isGodMode && (
        <div className="project-card__actions">
          <button 
            className="project-card__action-btn project-card__action-btn--edit"
            onClick={() => onEdit(project)}
            aria-label="Edit project"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="project-card__action-btn project-card__action-btn--delete"
            onClick={() => onDelete(project)}
            aria-label="Delete project"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

      {/* Project Image */}
      <div className="project-card__image-wrapper">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.name}
            fill
            className="project-card__image"
          />
        ) : (
          <div className="project-card__image-placeholder">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 6L6 16V32L24 42L42 32V16L24 6Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M24 22L14 28V38L24 42L34 38V28L24 22Z" fill="currentColor" opacity="0.2"/>
              <path d="M6 16L24 26M24 26L42 16M24 26V42" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
        )}
      </div>
      
      {/* Project Body */}
      <div className="project-card__body">
        <h3 className="project-card__name">{project.name}</h3>
        <p className="project-card__motivation">{project.motivation}</p>
        
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card__link"
        >
          <span>View Project</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3H3V13H13V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 3H13V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 3L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </article>
  )
}

function EmptyState() {
  return (
    <div className="projects-empty">
      <div className="projects-empty__icon">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 6L6 16V32L24 42L42 32V16L24 6Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M24 22L14 28V38L24 42L34 38V28L24 22Z" fill="currentColor" opacity="0.15"/>
          <path d="M6 16L24 26M24 26L42 16M24 26V42" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>
      <p className="projects-empty__text">
        Projects coming soon...
      </p>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="projects-loading">
      <div className="projects-loading__spinner" />
      <p className="projects-loading__text">Loading projects...</p>
    </div>
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function Projects() {
  const { isGodMode } = useGodMode()
  
  // Projects state
  const [projects, setProjects] = useState<ProjectDB[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [editProject, setEditProject] = useState<ProjectDB | null>(null)
  const [deleteProject, setDeleteProject] = useState<ProjectDB | null>(null)

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (!response.ok) {
        throw new Error('Failed to fetch projects')
      }
      const data = await response.json()
      setProjects(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError('Failed to load projects')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  // Project handlers
  const handleEditProject = (project: ProjectDB) => {
    setEditProject(project)
  }

  const handleDeleteProject = (project: ProjectDB) => {
    setDeleteProject(project)
  }

  const confirmDeleteProject = async (): Promise<boolean> => {
    if (!deleteProject) return false

    try {
      const response = await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteProject.id }),
        credentials: 'include',
      })

      if (!response.ok) {
        if (response.status === 401) {
          return false // Session expired
        }
        throw new Error('Failed to delete')
      }

      await fetchProjects()
      return true
    } catch (err) {
      console.error('Delete error:', err)
      throw err
    }
  }

  return (
    <main className="projects-page">
      <div className="container">
        {/* Page Header */}
        <header className="projects-header">
          <div className="projects-header__badge">
            <span className="projects-header__badge-dot" />
            <span>Project Archive</span>
          </div>
          <h1 className="projects-header__title">Projects</h1>
          <p className="projects-header__description">
            Things I&apos;ve built, deployed, and learned from along the way
          </p>
        </header>

        {/* God Mode: Add Project Button */}
        {isGodMode && (
          <button 
            className="add-project-btn"
            onClick={() => setShowAddModal(true)}
          >
            <span className="add-project-btn__icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <span>Add Project</span>
          </button>
        )}

        {/* Projects Gallery */}
        <div className="projects-gallery">
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <div className="projects-error">
              <p>{error}</p>
              <button onClick={fetchProjects}>Retry</button>
            </div>
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                isGodMode={isGodMode}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      {/* Modals */}
      <ProjectFormModal
        isOpen={showAddModal || !!editProject}
        onClose={() => {
          setShowAddModal(false)
          setEditProject(null)
        }}
        onSuccess={fetchProjects}
        editProject={editProject}
      />

      <DeleteConfirmModal
        isOpen={!!deleteProject}
        onClose={() => setDeleteProject(null)}
        onConfirm={confirmDeleteProject}
        title={deleteProject?.name || ''}
      />
    </main>
  )
}
