"use client";

import { FaInfoCircle } from "react-icons/fa";
import Modal from "@/components/Common/Modal";
import type { StatusBulletin } from "@/lib/status-banner";
import Markdown from "./Markdown";

type Props = {
  bulletin: StatusBulletin;
  isOpen: boolean;
  onClose: () => void;
};

/**
 * "More details" popup for a news bulletin.
 */
export default function StatusBulletinModal({ bulletin, isOpen, onClose }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<FaInfoCircle className="h-6 w-6" aria-hidden="true" />}
      title={bulletin.title}
    >
      <div className="whitespace-pre-wrap leading-relaxed">
        <Markdown text={bulletin.details ?? bulletin.description} />
      </div>
    </Modal>
  );
}
